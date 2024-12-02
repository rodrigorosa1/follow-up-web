import * as React from "react";
import { useFormik } from "formik";
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Typography } from "@mui/material";
import { ReplyOutlined, Save } from "@mui/icons-material";
import { postStudentHealthPlan } from "../../services/student.service";
import { IHealthPlan } from "../../types/healthPlan.type";
import { getHealthPlans } from "../../services/healhPlan.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 2
};

interface ModalSelectPlanProps {
    id: string,
    isOpen: boolean;
    onClose: () => void;
    onSnackbarOpen: () => void;
    studentPlan: () => void;
}

export const ModalSelectPlan: React.FC<ModalSelectPlanProps> = ({ id, isOpen, onClose, onSnackbarOpen, studentPlan }) => {
    const [healthPlans, setHealthPlans] = React.useState<IHealthPlan[]>([]);

    const initial = {
        student_id: id,
        health_plan_id: '',
    };

    const formatPayload = (values: any) => {
        const data = {
            ...values,
            student_id: id,
        }
        return data
    }

    const listPlans = async () => {
        const plans = await getHealthPlans();
        setHealthPlans(plans);
    }

    React.useEffect(() => {
        listPlans();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initial,
        onSubmit: (values) => {
            const payload = formatPayload(values);
            postStudentHealthPlan(payload);
            onSnackbarOpen();
            onClose();
            studentPlan();
        }
    });

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Selecione o plano:
                    </Typography>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mr: 2 }}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel>Selecionar Plano</InputLabel>
                                <Select
                                    required
                                    label="Planos"
                                    id="health_plan_id"
                                    name="health_plan_id"
                                    value={formik.values.health_plan_id}
                                    onChange={formik.handleChange}
                                    size="small"
                                >
                                    {
                                        healthPlans.map((plan) => {
                                            return <MenuItem key={plan.id} value={plan.id}>
                                                {plan.fantasy_name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Stack>

                    </Grid>
                    <Grid item>
                        <Grid container alignItems="right" justifyContent="right">
                            <Grid item alignContent="center" xl={1} lg={1} md={1} sm={1} xs={1} sx={{ mr: 2 }}>
                                <IconButton
                                    title="Voltar"
                                    onClick={onClose}
                                >
                                    <ReplyOutlined />
                                </IconButton>
                            </Grid>
                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1} mr={2} sx={{ mr: 2 }}>
                                <IconButton
                                    type="submit"
                                    title="Savar"
                                >
                                    <Save />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Modal>
    );
}