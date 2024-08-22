import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { deleteStudentsResponsable } from "../../services/student.service";
import { IResponsable } from "../../types/student.type";

interface deleteResponsableProps {
    responsable: IResponsable | null;
    isOpen: boolean;
    getResponsables: () => void;
    onClose: () => void;
    onSnackbarOpen: () => void;
}

export const DeleteResponsableDialog: React.FC<deleteResponsableProps> = ({ responsable, isOpen, getResponsables, onClose, onSnackbarOpen }) => {
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