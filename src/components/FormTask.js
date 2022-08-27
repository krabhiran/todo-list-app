import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';
import Chip from '@mui/material/Chip';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import TitleIcon from '@mui/icons-material/Title';
import PercentIcon from '@mui/icons-material/Percent';
import DescriptionIcon from '@mui/icons-material/Description';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const FormTask = (props) => {

    const [open, setOpen] = useState(true);

    const [openEmptyAlert, setOpenEmptyAlert] = useState(false);

    const handleClose = () => {
        setOpen(false);
        if (props.actionType === "create") { props.setShowCreateDialog(false); }
        else if (props.actionType === "view") { props.setShowViewDialog(false); }
        else if (props.actionType === "edit") { props.setShowEditDialog(false); }
    };

    const currentDate = new Date();

    const [formData, setFormData] = useState({
        title: '',
        status: '',
        deadline: currentDate.toISOString(),
        priority: '',
        progress: '',
        description: ''
    });

    const [formError, setFormError] = useState({
        title: false,
        status: false,
        deadline: false,
        priority: false,
        progress: false,
        description: false
    })

    const taskFormHandler = (e) => {

        if (e.target.name === "progress") {
            if (e.target.value < 0 || e.target.value > 100) {
                setFormError(prev => ({
                    ...prev,
                    [e.target.name]: true
                }));
            }
            else {
                setFormError(prev => ({
                    ...prev,
                    [e.target.name]: false
                }));
            }
        }

        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const deadlineChangeHandler = (newDate) => {
        setFormData(prev => ({
            ...prev,
            'deadline': newDate.toISOString()
        }));
    }

    const emptyFieldValidator = () => {
        if (formError.title || formError.status || formError.deadline || formError.priority || formError.progress || formError.description) { return false; }
        else {
            if (formData.title && formData.status && formData.deadline && formData.priority && formData.progress && formData.description) {
                return true;
            }
            else { return false; }
        }
    }

    const taskCreateHandler = () => {
        if (emptyFieldValidator()) {
            const formElement = formData;
            formElement.progress = parseInt(formData.progress);
            props.taskDetailsCreatePassHandler(formElement);

            setOpen(false);
            props.setOpenCreateAlert(true);
            props.setShowCreateDialog(false);
        }
        else {
            setOpenEmptyAlert(true);
        }
    }

    const taskUpdateHandler = () => {
        if (emptyFieldValidator()) {
            const formElement = formData;
            formElement.progress = parseInt(formData.progress);
            const formParams = {
                taskId: props.taskItem.id,
                taskElement: formElement
            }
            props.taskDetailsEditPassHandler(formParams);

            setOpen(false);
            props.openEditAlertHandler(true);
            props.setShowEditDialog(false);
        }
        else {
            setOpenEmptyAlert(true);
        }
    }

    useEffect(() => {
        if (props.actionType != "create") {
            const elementData = props.taskItem;
            setFormData({
                title: elementData.title,
                status: elementData.status,
                deadline: elementData.deadline,
                priority: elementData.priority,
                progress: elementData.progress,
                description: elementData.description
            });
        }
    }, []);

    return (
        <>
            <BootstrapDialog
                //onClose={handleClose}
                open={open}
                maxWidth={'md'}
            >
                <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
                    {(props.actionType === "create") && <>Create Task</>}
                    {(props.actionType === "view") && <>View Task - <Chip label={props.taskItem.id} /></>}
                    {(props.actionType === "edit") && <>Edit Task - <Chip label={props.taskItem.id} /></>}
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={4}>

                        <Grid item xs={8}>
                            <TextField
                                disabled={(props.actionType === "view")}
                                InputProps={{ endAdornment: <InputAdornment position="end"><TitleIcon /></InputAdornment> }}
                                fullWidth
                                required
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={taskFormHandler}
                            //InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label-status">Status *</InputLabel>
                                <Select
                                    disabled={(props.actionType === "view")}
                                    labelId="select-label-status"
                                    id="simple-select-status"
                                    label="Status *"
                                    name="status"
                                    value={formData.status}
                                    onChange={taskFormHandler}
                                >
                                    <MenuItem value={'Not Started'}>Not Started</MenuItem>
                                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                    <MenuItem value={'In Review'}>In Review</MenuItem>
                                    <MenuItem value={'Completed'}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    //disablePast
                                    disabled={(props.actionType === "view")}
                                    label="Deadline *"
                                    value={formData.deadline}
                                    onChange={deadlineChangeHandler}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label-priority">Priority *</InputLabel>
                                <Select
                                    disabled={(props.actionType === "view")}
                                    labelId="select-label-priority"
                                    id="select-priority"
                                    label="Priority *"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={taskFormHandler}
                                >
                                    <MenuItem value={'Low'}>Low</MenuItem>
                                    <MenuItem value={'Medium'}>Medium</MenuItem>
                                    <MenuItem value={'High'}>High</MenuItem>
                                    <MenuItem value={'Critical'}>Critical</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                error={formError.progress}
                                helperText={formError.progress && 'Please enter the value between 0 - 100'}
                                disabled={(props.actionType === "view")}
                                fullWidth
                                required
                                InputProps={{ inputProps: { min: 0, max: 100 }, endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment> }}
                                label="Progress"
                                type="number"
                                name="progress"
                                value={formData.progress}
                                onChange={taskFormHandler}
                            //InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                disabled={(props.actionType === "view")}
                                InputProps={{ endAdornment: <InputAdornment position="end"><DescriptionIcon /></InputAdornment> }}
                                fullWidth
                                multiline
                                rows={4}
                                required
                                label="Description"
                                size="large"
                                name="description"
                                value={formData.description}
                                onChange={taskFormHandler}
                            //InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>

                    <Button variant="contained" size="small" color="info" endIcon={<HighlightOffIcon />} onClick={handleClose}>
                        Cancel
                    </Button>

                    {(props.actionType != "view") && <>
                        {(props.actionType === "edit") &&
                            <Button variant="contained" size="small" color="warning" endIcon={<UpdateIcon />} onClick={taskUpdateHandler}>
                                Update
                            </Button>
                        }
                        {(props.actionType === "create") &&
                            <Button variant="contained" size="small" color="success" endIcon={<SaveOutlinedIcon />} onClick={taskCreateHandler}>
                                Save
                            </Button>
                        }
                    </>
                    }

                </DialogActions>

            </BootstrapDialog >

            <Snackbar open={openEmptyAlert} autoHideDuration={2500} onClose={() => setOpenEmptyAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setOpenEmptyAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Please check the required fields
                </Alert>
            </Snackbar>

        </>
    );
}

export default FormTask;