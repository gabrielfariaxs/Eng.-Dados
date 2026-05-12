import sys, os
sys.path.append(os.getcwd())
from pipeline import LicitacaoMEIETL
import logging

logging.basicConfig(level=logging.INFO)

print("Iniciando teste direto para MongoDB...")
etl = LicitacaoMEIETL(15)
print("1. Extraindo...")
etl.extract()
print("2. Transformando...")
etl.transform()
print("3. Carregando no MongoDB...")
etl.load_mongo()
print("Teste finalizado.")
