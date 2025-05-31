
export default interface IInvoice {
    cnpj_prestador: string,
    ref: string,
    numero_rps: string,
    serie_rps: string,
    status: string,
    address: string,
    numero: number | null,
    codigo_verificacao: string | null,
    data_emissao: string,
    url: string,
    caminho_xml_nota_fiscal: string,
    caminho_xml_cancelamento?: string
}