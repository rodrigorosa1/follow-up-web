import * as React from "react";
import { useFormik } from "formik";
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { getStudentHealthPlan, getStudentsResponsible } from "../../../services/student.service";
import { IResponsable } from "../../../types/student.type";
import { IHealthPlan } from "../../../types/healthPlan.type";
import { IBilling } from "../../../types/billing.type";
import { senderInvoice } from "../../../services/invoice.service";
import { PageLoad } from "../../../components/animations/PageLoad";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 2
};

interface ModalInvoiceGenerate {
    ids?: string[],
    billing?: IBilling | null;
    student_id: string,
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    onSnackbarError: (active: boolean) => void;
    onSnackbarMessage: (message: string) => void;
    startResume: () => void;
}

export const BillingInvoiceGenerate: React.FC<ModalInvoiceGenerate> = ({ ids, billing, student_id, isOpen, onClose, onSnackbarOpen, onSnackbarError, onSnackbarMessage, startResume }) => {
    const [category, setCategory] = React.useState('');
    const [responsibles, setResponsibles] = React.useState<IResponsable[]>([]);
    const [helthPlans, setHelthPlans] = React.useState<IHealthPlan[]>([]);
    const [dataLoaded, setDataLoaded] = React.useState(true);

    const initial = {
        student_id: student_id,
        responsible_id: '',
        health_plan_id: '',
    };

    const changeCategory = (event: any) => {
        if (event.target.value === 'CONVÊNIO') {
            plansList();
        }
        if (event.target.value === 'RESPONSÁVEL') {
            responsiblesList();
        }
        setCategory(event.target.value);
    }

    const responsiblesList = async () => {
        const resps = await getStudentsResponsible(student_id);
        setResponsibles(resps);
    }

    const plansList = async () => {
        const plans = await getStudentHealthPlan(student_id);
        const plans_ = plans.map((plan: any) => ({
            id: plan.plan.id,
            fantasy_name: plan.plan.fantasy_name,
        }))
        setHelthPlans(plans_);
    }

    const setPayload = (values: any) => {
        if (!responsibles || responsibles.length === 0) {
            values.responsible_id = null;
        }

        if (!helthPlans || helthPlans.length === 0) {
            values.health_plan_id = null;
        }

        if (billing) {
            return {
                ...values,
                billings: [billing.id],
            }
        }

        return {
            ...values,
            billings: ids,
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            const payload = setPayload(values);
            setDataLoaded(false);
            onSnackbarMessage('Modulo não habilitado');
            onSnackbarError(true);
            onSnackbarOpen();
            setDataLoaded(true);
            onClose();
            // senderInvoice(payload).then((r) => {
            //     if (r.status_code === 200) {
            //         onSnackbarError(false);
            //         onSnackbarOpen();
            //         onClose();
            //         setDataLoaded(true);
            //         startResume();
            //         return;
            //     }
            //     onSnackbarMessage(r.response.data.detail);
            //     onSnackbarError(true);
            //     onSnackbarOpen();
            //     setDataLoaded(true);
            //     onClose();
            // }).catch((e) => {
            //     console.error(e);
            // });
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dados para emissão
                    </Typography>
                    {!dataLoaded ? (
                        <PageLoad />
                    ) : (
                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item sx={{ mr: 2 }}>
                                <Grid container>
                                    <FormControl sx={{ m: 2, minWidth: 450 }}>
                                        <InputLabel>Emitir para</InputLabel>
                                        <Select
                                            label="Tipo de Faturamento"
                                            id="category"
                                            name="category"
                                            value={category}
                                            onChange={changeCategory}
                                            fullWidth
                                            required
                                            size="small"
                                        >
                                            <MenuItem value={'CONVÊNIO'}>CONVÊNIO</MenuItem>
                                            <MenuItem value={'RESPONSÁVEL'} selected>RESPONSÁVEL</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {category == 'CONVÊNIO' && (
                                <Grid item sx={{ mr: 2 }}>
                                    <Grid container>
                                        <FormControl sx={{ m: 2, minWidth: 450 }}>
                                            <InputLabel>Plano</InputLabel>
                                            <Select
                                                label="Plano"
                                                id="health_plan_id"
                                                name="health_plan_id"
                                                value={formik.values.health_plan_id}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                required
                                            >
                                                {
                                                    helthPlans.map((plan) => {
                                                        return <MenuItem key={plan.id} value={plan.id}>
                                                            {plan.fantasy_name}
                                                        </MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            )}
                            {category == 'RESPONSÁVEL' && (
                                <Grid item sx={{ mr: 2 }}>
                                    <Grid container>
                                        <FormControl sx={{ m: 2, minWidth: 450 }}>
                                            <InputLabel>Responsável</InputLabel>
                                            <Select
                                                label="Responsável"
                                                id="responsible_id"
                                                name="responsible_id"
                                                value={formik.values.responsible_id}
                                                onChange={formik.handleChange}
                                                fullWidth
                                                required
                                            >
                                                {
                                                    responsibles.map((resp) => {
                                                        return <MenuItem key={resp.id} value={resp.id}>
                                                            {resp.fullname}
                                                        </MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            )}

                            <Grid container alignItems="right" justifyContent="right" sx={{ marginTop: 2 }}>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ mr: 2 }}>
                                    <IconButton
                                        title="Voltar"
                                        onClick={onClose}
                                    >
                                        <ReplyOutlined />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2} sx={{ mr: 2 }}>
                                    <IconButton
                                        type="submit"
                                        title="Savar"
                                    >
                                        <Save />
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