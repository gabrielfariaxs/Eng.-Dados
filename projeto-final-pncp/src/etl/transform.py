from abc import ABC, abstractmethod
from typing import List, Dict, Any
from datetime import datetime

class BaseTransformer(ABC):
    @abstractmethod
    def transform(self, data: Any) -> Any:
        pass

class PNCPTransformer(BaseTransformer):
    def __init__(self):
        pass

    def _parse_date(self, date_str: str) -> datetime:
        """Converte string ISO para datetime. Trata nulos."""
        if not date_str:
            return None
        try:
            # Tenta converter do formato ISO retornado pela API
            return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except ValueError:
            return None

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Normaliza os dados, tipifica e trata nulos.
        Enriquece com a data de carga.
        """
        transformed_data = []
        load_date = datetime.utcnow()

        for item in raw_data:
            # Tratar nulos e tipar valores
            valor_estimado = item.get("valorTotalEstimado")
            valor_estimado = float(valor_estimado) if valor_estimado is not None else 0.0
            
            valor_homologado = item.get("valorTotalHomologado")
            valor_homologado = float(valor_homologado) if valor_homologado is not None else 0.0

            # Extrair chaves úteis com default de segurança
            orgao = item.get("orgaoEntidade", {})
            unidade = item.get("unidadeOrçamentaria", {})
            
            transformed_item = {
                "numeroControlePNCP": item.get("numeroControlePNCP", ""),
                "orgaoEntidade": {
                    "cnpj": orgao.get("cnpj", ""),
                    "razaoSocial": orgao.get("razaoSocial", "NÃO INFORMADO"),
                    "esfera": orgao.get("esferaId", "NÃO INFORMADO"),
                    "poder": orgao.get("poderId", "NÃO INFORMADO")
                },
                "modalidadeId": item.get("modalidadeId", -1),
                "modalidadeNome": item.get("modalidadeNome", "NÃO INFORMADO"),
                "objetoCompra": item.get("objetoCompra", "NÃO INFORMADO"),
                "valorTotalEstimado": valor_estimado,
                "valorTotalHomologado": valor_homologado,
                "uf": unidade.get("ufSigla", "NÃO INFORMADO"),
                "municipio": unidade.get("municipioNome", "NÃO INFORMADO"),
                "situacaoCompraId": item.get("situacaoCompraId", -1),
                "situacaoCompraNome": item.get("situacaoCompraNome", "NÃO INFORMADO"),
                "dataPublicacaoPncp": self._parse_date(item.get("dataPublicacaoPncp")),
                "dataAtualizacaoPncp": self._parse_date(item.get("dataAtualizacaoPncp")),
                "dataCarga": load_date
            }
            
            transformed_data.append(transformed_item)

        return transformed_data
