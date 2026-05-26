from pipeline import LicitacaoMEIETL

def main():
    print("--- LicitaMEI Data Pipeline ---")
    try:
        dias = int(input("Quantidade de dias para buscar licitações (padrão: 15): ") or 15)
    except ValueError:
        dias = 15
    
    # Execução encadeada (Chaining) para código mais limpo
    (LicitacaoMEIETL(dias)
        .extract()
        .transform()
        .load_sqlite()
        .load_mongo()
        .analyze())
    
    print("\nProcesso concluído com sucesso!")

if __name__ == "__main__":
    main()
