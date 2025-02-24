import { grey } from "@mui/material/colors";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    DataGrid,
    GridRowSpacingParams,
    gridClasses,    
    GridLocaleText
} from "@mui/x-data-grid";
import { useCallback } from "react";


interface DataGridProps {
    columns: any;
    rows: any;
    pagination?: number;
}


export const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            {/* <GridToolbarColumnsButton /> */}
            <GridToolbarFilterButton />
            {/* <GridToolbarDensitySelector /> */}
        </GridToolbarContainer>
    );
}

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
    // Root
    noRowsLabel: 'Sem registros',
    noResultsOverlayLabel: 'Resultado não localizado.',

    // Density selector toolbar button text
    toolbarDensity: 'Densidade',
    toolbarDensityLabel: 'Densidade',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Padrão',
    toolbarDensityComfortable: 'Confortável',

    // Columns selector toolbar button text
    toolbarColumns: 'Colunas',
    toolbarColumnsLabel: 'Selecionar colunas',

    // Filters toolbar button text
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Exibir filtros',
    toolbarFiltersTooltipHide: 'Ocultar filtros',
    toolbarFiltersTooltipShow: 'Exibir filtros',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} filtros ativos` : `${count} filtros ativos`,

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Procurar…',
    toolbarQuickFilterLabel: 'Procurar',
    toolbarQuickFilterDeleteIconLabel: 'Limpar',

    // Export selector toolbar button text
    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Download CSV',
    toolbarExportPrint: 'Imprimir',
    toolbarExportExcel: 'Download Excel',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Procurar coluna',
    columnsPanelTextFieldPlaceholder: 'Coluna título',
    columnsPanelDragIconLabel: 'Reordenar coluna',
    columnsPanelShowAllButton: 'Exibir tudo',
    columnsPanelHideAllButton: 'Ocultar tudo',

    // Filter panel text
    filterPanelAddFilter: 'Adicionar filtro',
    filterPanelRemoveAll: 'Remover tudo',
    filterPanelDeleteIconLabel: 'Excluir',
    filterPanelLogicOperator: 'Operador lógico',
    filterPanelOperator: 'Operador',
    filterPanelOperatorAnd: 'E',
    filterPanelOperatorOr: 'Ou',
    filterPanelColumns: 'Colunas',
    filterPanelInputLabel: 'Valor',
    filterPanelInputPlaceholder: 'Filtrar valor',

    // Filter operators text
    filterOperatorContains: 'contém',
    filterOperatorEquals: 'igual',
    filterOperatorStartsWith: 'começa com',
    filterOperatorEndsWith: 'termina com',
    filterOperatorIs: 'é',
    filterOperatorNot: 'não é',
    filterOperatorAfter: 'está depois',
    filterOperatorOnOrAfter: 'está ligado ou depois',
    filterOperatorBefore: 'é antes',
    filterOperatorOnOrBefore: 'está ligado ou antes',
    filterOperatorIsEmpty: 'está vazio',
    filterOperatorIsNotEmpty: 'não está vazio',
    filterOperatorIsAnyOf: 'é qualquer um de',

    // Filter values text
    filterValueAny: 'any',
    filterValueTrue: 'true',
    filterValueFalse: 'false',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Exibir colunas',
    columnMenuManageColumns: 'Gerenciar colunas',
    columnMenuFilter: 'Filtro',
    columnMenuHideColumn: 'Ocultar coluna',
    columnMenuUnsort: 'Desordenar',
    columnMenuSortAsc: 'Ordenar por ASC',
    columnMenuSortDesc: 'Ordenar Ordenar DESC',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} filtros ativos` : `${count} filtros ativos`,
    columnHeaderFiltersLabel: 'Exibir filtros',
    columnHeaderSortIconLabel: 'Ordenar',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} selecionados`
            : `${count.toLocaleString()} selecionado`,

    // Total row amount footer text
    footerTotalRows: 'Total:',

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'seleção',
    checkboxSelectionSelectAllRows: 'Selecionar tudo',
    checkboxSelectionUnselectAllRows: 'Desmarcar tudo',
    checkboxSelectionSelectRow: 'Selecione',
    checkboxSelectionUnselectRow: 'Desmarcar',

    // Boolean cell text
    booleanCellTrueLabel: 'sim',
    booleanCellFalseLabel: 'não',

    // Actions cell more text
    actionsCellMore: 'mais',

    // Column pinning text
    pinToLeft: 'Fixar à esquerda',
    pinToRight: 'Fixar à direita',
    unpin: 'Unpin',

    // Tree Data
    treeDataGroupingHeaderName: 'Grupo',
    treeDataExpand: 'ver',
    treeDataCollapse: 'ocutar',

    // Grouping columns
    groupingColumnHeaderName: 'Grupo',
    groupColumn: (name) => `Agrupar por ${name}`,
    unGroupColumn: (name) => `Parar de agrupar por ${name}`,

    // Master/detail
    detailPanelToggle: 'Alternância do painel de detalhes',
    expandDetailPanel: 'Expandir',
    collapseDetailPanel: 'Colapso',

    // Used core components translation keys
    MuiTablePagination: {},

    // Row reordering text
    rowReorderingHeaderName: 'Reordenar',

    // Aggregation
    aggregationMenuItemHeader: 'Operação',
    aggregationFunctionLabelSum: 'soma',
    aggregationFunctionLabelAvg: 'média',
    aggregationFunctionLabelMin: 'min',
    aggregationFunctionLabelMax: 'max',
    aggregationFunctionLabelSize: 'tamanho',
};


export const CustomDataGrid: React.FC<DataGridProps> = ({ columns, rows, pagination }) => {
    const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <DataGrid
            rowHeight={60}
            columns={columns}
            rows={rows}
            density={'compact'}
            getRowSpacing={getRowSpacing}
            sx={{
                [`& .${gridClasses.row}`]: {
                    bgcolor: (theme) => theme.palette.mode === 'light' ? grey[50] : grey[200],
                },
            }}
            slots={{
                toolbar: CustomToolbar,
            }}
            localeText={GRID_DEFAULT_LOCALE_TEXT}

            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: pagination ? pagination : 10,
                    },
                }
            }}
            pageSizeOptions={[5, 10, 25]}
            slotProps={{
                panel: {
                    sx: {
                        '& .MuiTypography-root': {
                            color: 'primary',
                            fontSize: 15,
                        },
                        '& .MuiDataGrid-filterForm': {
                            bgcolor: 'primary',
                        },
                    },
                },
            }}

        />
    );

}