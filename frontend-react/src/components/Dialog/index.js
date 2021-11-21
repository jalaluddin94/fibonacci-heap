import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";

function SweetDialog (props){
    const {
        cancelText, //text on cancellation button
        content, //could be react element
        open, //boolean, control whether the popup dialog is open/not
        okText, //text on confirmation button
        onCancel, //function triggered when cancellation button is clicked
        onOK, //function triggered when confirmation button is clicked
        title, //text, fill with the title - could NOT be filled with HTML
        type //"info", "warning", "success", "error", "confirm"
    } = props;

    return (
        <div>
            <Dialog open={open} scroll="paper">
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                        {content}
                </DialogContent>
                <DialogActions>
                    {
                        type === "confirm" && (
                            <Button onClick={onCancel} color="secondary" variant="contained">
                                {
                                    cancelText ? cancelText : "Cancel"
                                }
                            </Button>
                        )
                    }
                    <Button onClick={onOK} color="primary" variant="contained">
                        {
                            okText ? okText : "OK"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SweetDialog;

SweetDialog.propTypes = {
    cancelText: PropTypes.string, //text on cancellation button
    content: PropTypes.node, //could be react element
    open: PropTypes.bool, //boolean, control whether the popup dialog is open/not
    okText: PropTypes.string, //text on confirmation button
    onCancel: PropTypes.func, //function triggered when cancellation button is clicked
    onOK: PropTypes.func, //function triggered when confirmation button is clicked
    title: PropTypes.string, //text, fill with the title - could NOT be filled with HTML
    type: PropTypes.string //"info", "warning", "success", "error", "confirm"
}