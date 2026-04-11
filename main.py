from pipeline import UniversityETL

def main():
    print("--- University Data Pipeline ---")
    pais = input("País (ex: Brazil): ") or "Brazil"
    
    # Execução encadeada (Chaining) para código mais limpo
    (UniversityETL(pais)
        .extract()
        .transform()
        .load_sqlite()
        .load_mongo()
        .analyze())
    
    print("\nProcesso concluído com sucesso!")

if __name__ == "__main__":
    main()
