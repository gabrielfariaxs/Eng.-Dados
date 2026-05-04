from prefect import flow, task, get_run_logger
from dotenv import load_dotenv
from pipeline import UniversityETL

load_dotenv()

@task(retries=3, retry_delay_seconds=10)
def extract_data(country: str) -> UniversityETL:
    logger = get_run_logger()
    logger.info(f"Iniciando extração de dados para {country}")
    etl = UniversityETL(country)
    etl.extract()
    if etl.data is not None:
        logger.info(f"Registros extraídos brutos: {len(etl.data)}")
    return etl

@task
def transform_data(etl: UniversityETL) -> UniversityETL:
    logger = get_run_logger()
    logger.info("Iniciando transformação de dados")
    etl.transform()
    if etl.data is not None:
        logger.info(f"Registros após transformação: {len(etl.data)}")
    return etl

@task
def load_data_sqlite(etl: UniversityETL) -> UniversityETL:
    logger = get_run_logger()
    logger.info("Iniciando carga no SQLite local")
    etl.load_sqlite()
    return etl

@task
def load_data_mongo(etl: UniversityETL) -> UniversityETL:
    logger = get_run_logger()
    logger.info("Iniciando carga no MongoDB Atlas")
    etl.load_mongo()
    return etl

@task
def analyze_data(etl: UniversityETL):
    logger = get_run_logger()
    logger.info("Gerando análise e dashboard")
    etl.analyze()

@flow(name="ETL Universities Prefect", log_prints=True)
def etl_universities_flow(country: str = "Brazil"):
    logger = get_run_logger()
    logger.info(f"=== Iniciando Pipeline ETL para: {country} ===")
    
    etl_extracted = extract_data(country)
    etl_transformed = transform_data(etl_extracted)
    etl_sqlite = load_data_sqlite(etl_transformed)
    etl_mongo = load_data_mongo(etl_sqlite)
    analyze_data(etl_mongo)
    
    logger.info("=== Pipeline concluído com sucesso! ===")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "serve":
        print("Criando agendamento (Deployment) para rodar todos os dias às 8h...")
        etl_universities_flow.serve(
            name="extracao-diaria",
            cron="0 8 * * *",
            tags=["projeto-integrador", "diario", "etl"],
            description="Pipeline de ETL agendado para rodar diariamente às 08:00."
        )
    else:
        pais = sys.argv[1] if len(sys.argv) > 1 else "Brazil"
        etl_universities_flow(pais)

