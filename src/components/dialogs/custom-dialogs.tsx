import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { deleteStudentsResponsable, deleteStudentHealthPlan } from "../../services/student.service";
import { IResponsable } from "../../types/student.type";
import { IHealthPlan } from "../../types/healthPlan.type";

interface DeleteResponsableProps {
    responsable: IResponsable | null;
    isOpen: boolean;
    getResponsables: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

interface DeleteHealthPlanProps {
    healthPlan: IHealthPlan | null;
    isOpen: boolean;
    id: string;
    studentPlan: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const DeleteResponsableDialog: React.FC<DeleteResponsableProps> = ({ responsable, isOpen, getResponsables, onClose, onSnackbarOpen }) => {
    const deleteResponsale = () => {
        if (responsable) {
            deleteStudentsResponsable(responsable.id);
            getResponsables();
            onClose();
            onSnackbarOpen();
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmar exclusão"}
            </DialogTitle>
            {responsable ? (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você realmente deseja excluir {responsable.fullname} como responsável?
                    </DialogContentText>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você realmente deseja excluir o responsável?
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onClose}>Não</Button>
                <Button onClick={deleteResponsale} autoFocus>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>

    );

}


export const DeleteHealthPlanDialog: React.FC<DeleteHealthPlanProps> = ({ healthPlan, isOpen, id, studentPlan, onClose, onSnackbarOpen }) => {
    const deletePlan = () => {
        if (healthPlan?.id) {
            deleteStudentHealthPlan(id, healthPlan.id)
            studentPlan();
            onClose();
            onSnackbarOpen();
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmar exclusão"}
            </DialogTitle>
            {healthPlan ? (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você realmente deseja remover {healthPlan.fantasy_name}?
                    </DialogContentText>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você realmente deseja remover este plano?
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onClose}>Não</Button>
                <Button onClick={deletePlan} autoFocus>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>

    );

}