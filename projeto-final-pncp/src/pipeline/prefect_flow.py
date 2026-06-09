from prefect import flow, task, get_run_logger
from datetime import datetime, timedelta

from src.etl.extract import PNCPAPIExtractor
from src.etl.transform import PNCPTransformer
from src.etl.load import MongoDBLoader

@task(name="Extrair Dados do PNCP", retries=2, retry_delay_seconds=30)
def extract_task(data_inicial: str, data_final: str):
    logger = get_run_logger()
    logger.info(f"Iniciando extração do período de {data_inicial} até {data_final}")
    extractor = PNCPAPIExtractor()
    raw_data = extractor.extract(data_inicial=data_inicial, data_final=data_final)
    logger.info(f"Extraídos {len(raw_data)} registros.")
    return raw_data

@task(name="Transformar Dados do PNCP")
def transform_task(raw_data):
    logger = get_run_logger()
    if not raw_data:
        logger.info("Nenhum dado para transformar.")
        return []
        
    logger.info("Iniciando transformação dos dados.")
    transformer = PNCPTransformer()
    transformed_data = transformer.transform(raw_data)
    logger.info("Transformação concluída.")
    return transformed_data

@task(name="Carregar Dados no MongoDB Atlas")
def load_task(transformed_data):
    logger = get_run_logger()
    if not transformed_data:
        logger.info("Nenhum dado para carregar.")
        return
        
    logger.info("Iniciando carga no MongoDB.")
    loader = MongoDBLoader()
    loader.load(transformed_data)
    logger.info("Carga concluída com sucesso.")

@flow(name="Pipeline Principal de Dados PNCP")
def pncp_etl_flow(data_inicial: str = None, data_final: str = None):
    logger = get_run_logger()
    logger.info("Iniciando Flow Principal do PNCP")
    
    # Se as datas não forem informadas, extrai o dia anterior por padrão
    if not data_inicial or not data_final:
        ontem = datetime.now() - timedelta(days=1)
        ontem_str = ontem.strftime("%Y%m%d")
        data_inicial = ontem_str
        data_final = ontem_str

    raw_data = extract_task(data_inicial, data_final)
    transformed_data = transform_task(raw_data)
    load_task(transformed_data)

from prefect.client.schemas.schedules import CronSchedule

if __name__ == "__main__":
    # Para rodar uma vez agora mesmo, você pode descomentar a linha abaixo:
    # pncp_etl_flow()
    
    # Requisito da atividade: Demonstração de execução agendada (Deployment com Schedule)
    # Isso inicia um worker local que vai rodar o pipeline automaticamente todo dia à meia-noite
    print("Iniciando o deployment com agendamento diário...")
    pncp_etl_flow.serve(
        name="deployment-diario-pncp",
        cron="0 0 * * *",
        tags=["pncp", "etl"],
        description="Extração diária do PNCP"
    )
