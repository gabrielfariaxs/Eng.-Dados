from prefect import flow, task, get_run_logger
from dotenv import load_dotenv
from pipeline import LicitacaoMEIETL
from spark_transform import run_spark_transformation

load_dotenv()

@task(retries=3, retry_delay_seconds=10)
def extract_licitacoes(dias: int) -> LicitacaoMEIETL:
    logger = get_run_logger()
    logger.info(f"Iniciando extração de licitações para os próximos {dias} dias")
    etl = LicitacaoMEIETL(dias)
    etl.extract()
    if etl.data:
        logger.info(f"Licitações brutas encontradas: {len(etl.data)}")
    return etl

@task
def transform_licitacoes(etl: LicitacaoMEIETL) -> LicitacaoMEIETL:
    logger = get_run_logger()
    logger.info("Transformando dados das licitações (Flattening e Filtros MEI)")
    etl.transform()
    return etl

@task
def load_to_sqlite(etl: LicitacaoMEIETL) -> LicitacaoMEIETL:
    logger = get_run_logger()
    logger.info("Carregando dados no SQLite (licitacoes_mei.db)")
    etl.load_sqlite()
    return etl

@task
def load_to_mongo(etl: LicitacaoMEIETL) -> LicitacaoMEIETL:
    logger = get_run_logger()
    logger.info("Sincronizando com MongoDB Atlas")
    etl.load_mongo()
    return etl

@task
def spark_processing():
    logger = get_run_logger()
    logger.info("--- Iniciando Processamento Distribuído com PySpark ---")
    run_spark_transformation()

@task
def generate_insights(etl: LicitacaoMEIETL):
    logger = get_run_logger()
    logger.info("Gerando visualização de oportunidades por estado")
    etl.analyze()

@flow(name="LicitaMEI-Pipeline-Principal", log_prints=True)
def licitamei_main_flow(periodo_dias: int = 15):
    logger = get_run_logger()
    logger.info("🚀 Iniciando Pipeline LicitaMEI - Oportunidades Públicas")
    
    # Execução das tasks
    etl_raw = extract_licitacoes(periodo_dias)
    etl_clean = transform_licitacoes(etl_raw)
    etl_sqlite = load_to_sqlite(etl_clean)
    etl_mongo = load_to_mongo(etl_sqlite)
    
    # Nova etapa de processamento Big Data com Spark
    spark_processing()
    
    generate_insights(etl_mongo)
    
    logger.info("✅ Pipeline LicitaMEI concluído com sucesso!")

if __name__ == "__main__":
    import sys
    
    # Se rodar com 'serve', cria o deployment agendado
    if len(sys.argv) > 1 and sys.argv[1] == "serve":
        print("Configurando agendamento diário para o LicitaMEI às 08:00...")
        licitamei_main_flow.serve(
            name="busca-licitacoes-diaria",
            cron="0 8 * * *",
            tags=["mei", "licitacao", "producao"],
            description="Busca diariamente novas oportunidades de licitação para MEIs."
        )
    else:
        # Execução manual imediata
        dias = int(sys.argv[1]) if len(sys.argv) > 1 else 15
        licitamei_main_flow(dias)
