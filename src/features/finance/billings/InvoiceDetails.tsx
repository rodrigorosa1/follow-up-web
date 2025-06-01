import * as React from "react";
import { IBilling } from "../../../types/billing.type";
import { getBillingId } from "../../../services/invoice.service";
import IInvoice from "../../../types/invoice.type";
import { useFormik } from "formik";
import { Box, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PageLoad } from "../../../components/animations/PageLoad";
import { AttachEmail, NotInterested, OpenInBrowser, ReplyOutlined } from "@mui/icons-material";
import { HiDocumentArrowUp } from "react-icons/hi2";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 2
};


interface InvoiceDetailsProps {
    billing?: IBilling | null;
    isOpen: boolean;
    onClose: () => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ billing, isOpen, onClose }) => {
    const [invoice, setInvoice] = React.useState<IInvoice>();
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const initial = {
        email: ''
    }

    const loadInvoice = async () => {
        if (billing?.id) {
            const invoice = await getBillingId(billing.id);
            setInvoice(invoice);
        }
        setDataLoaded(true);
    }

    const handleInvoiceDownload = () => { }

    const handleInvoiceCancel = () => { }

    const handleInvoiceEmail = () => { }

    const handleInvoiceOpen = () => { }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    React.useEffect(() => {
        loadInvoice();
    }, []);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        Dados da Nota Fiscal
                    </Typography>
                    {!dataLoaded ? (
                        <PageLoad />
                    ) : (
                        <Grid item xs={12}>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <TableContainer component={Paper} sx={{ width: '100%' }}>
                                    <Table sx={{ width: '100%' }}>
                                        <TableHead className="tableHeader">
                                            <TableRow>
                                                <TableCell>Ref</TableCell>
                                                <TableCell>Número rps</TableCell>
                                                <TableCell>Série rps</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                            <TableRow>
                                                <TableCell>{invoice?.ref}</TableCell>
                                                <TableCell>{invoice?.numero_rps}</TableCell>
                                                <TableCell>{invoice?.serie_rps}</TableCell>
                                                <TableCell>{invoice?.status}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: 2, mr: 2 }} alignContent="center" alignItems="center">
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <IconButton
                                        title="Fechar"
                                        onClick={onClose}
                                    >
                                        <ReplyOutlined />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <IconButton
                                        title="DownLoad"
                                        onClick={handleInvoiceDownload}
                                    >
                                        <HiDocumentArrowUp />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <IconButton
                                        title="Abrir"
                                        onClick={handleInvoiceDownload}
                                    >
                                        <OpenInBrowser />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <IconButton
                                        title="Enviar Email"
                                        onClick={handleInvoiceEmail}
                                    >
                                        <AttachEmail />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <IconButton
                                        title="Cancelar Nota"
                                        onClick={handleInvoiceCancel}
                                    >
                                        <NotInterested />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </form>
        </Modal>
    );
}   