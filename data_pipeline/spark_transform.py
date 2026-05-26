import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when
from dotenv import load_dotenv, find_dotenv
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def run_spark_transformation():
    """Realiza a transformação dos dados do MongoDB Atlas usando PySpark."""
    load_dotenv(find_dotenv())
    
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("DB_NAME", "licitamei_db")
    collection = os.getenv("COLLECTION_NAME", "oportunidades")

    if not uri or "<password>" in uri:
        logger.error("MONGODB_URI não configurada no .env. Impossível rodar Spark no Atlas.")
        return

    logger.info("Iniciando Sessão PySpark com conector MongoDB...")
    
    # Inicializa o Spark com o conector do MongoDB
    spark = SparkSession.builder \
        .appName("LicitaMEI-SparkTransformation") \
        .config("spark.mongodb.read.connection.uri", uri) \
        .config("spark.mongodb.read.database", db_name) \
        .config("spark.mongodb.read.collection", collection) \
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:10.1.1") \
        .getOrCreate()

    try:
        logger.info(f"Lendo dados da coleção {collection} no MongoDB Atlas...")
        df = spark.read.format("mongodb").load()

        if df.count() == 0:
            logger.warning("Nenhum dado encontrado no MongoDB para processar.")
            return

        # --- TRANSFORMAÇÕES PYSPARK ---
        logger.info("Realizando transformações tabulares com PySpark...")
        
        # 1. Seleção e limpeza de colunas
        # O MongoDB salva objetos complexos, aqui estruturamos em formato tabular
        df_structured = df.select(
            col("numero").alias("id_licitacao"),
            col("orgao"),
            col("estado"),
            col("descricao"),
            col("data_publicacao"),
            col("foco_mei")
        )

        # 2. Criar uma coluna de 'Prioridade' baseada no termo MEI
        df_final = df_structured.withColumn(
            "prioridade",
            when(col("foco_mei") == True, "ALTA").otherwise("NORMAL")
        )

        # 3. Mostrar o resultado tabular (Top 20)
        logger.info("Resultado da transformação PySpark (Tabular):")
        df_final.show(20, truncate=False)

        # 4. Salvar como CSV ou Parquet para auditoria/apresentação
        base_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(base_dir, "output_spark_licitacoes")
        df_final.write.mode("overwrite").option("header", "true").csv(output_path)
        logger.info(f"Dados transformados salvos em: {output_path}")

    except Exception as e:
        logger.error(f"Erro no processamento Spark: {e}")
    finally:
        spark.stop()
        logger.info("Sessão Spark encerrada.")

if __name__ == "__main__":
    run_spark_transformation()
