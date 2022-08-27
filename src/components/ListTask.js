import React, { useState } from 'react';
import FormTask from './FormTask';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import dayjs from 'dayjs';
import Moment from 'moment';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CircularProgressWithLabel(props) {

    const progressColor = (progressValue) => {
        if (progressValue >= 0 && progressValue <= 33) { return 'secondary' }
        else if (progressValue > 33 && progressValue <= 66) { return 'info' }
        else if (progressValue > 66 && progressValue <= 99) { return 'warning' }
        else if (progressValue === 100) { return 'success' }
    }

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" color={progressColor(props.value)} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${props.value}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function Row(props) {

    const statusColor = {
        'Not Started': 'secondary',
        'In Progress': 'info',
        'In Review': 'warning',
        'Completed': 'success'
    }
    const priorityColor = {
        'Low': 'disabled',
        'Medium': 'primary',
        'High': 'warning',
        'Critical': 'error'
    }

    const { row } = props;
    const [open, setOpen] = useState(false);

    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const openEditAlertHandler = (value) => { props.setOpenEditAlert(value); }
    const openEmptyEditAlertHandler = (value) => { props.setOpenEmptyEditAlert(value); };

    const taskDetailsEditPassHandler = (data) => { props.taskDataRowEdit(data); }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset !important' } }}>
                <TableCell align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" align="center" scope="row">{row.id}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                    <Chip label={row.status} color={statusColor[`${row.status}`]} />
                </TableCell>
                <TableCell align="center">{Moment(row.deadline).format('MMMM Do YYYY, h:mm A')}</TableCell>
                <TableCell align="center">
                    <Tooltip title={row.priority} placement="bottom">
                        <IconButton>
                            <FlagIcon color={priorityColor[`${row.priority}`]} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center">
                    <CircularProgressWithLabel value={row.progress} />
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="View" placement="bottom">
                        <IconButton onClick={() => setShowViewDialog(true)}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="Edit" placement="bottom">
                        <IconButton onClick={() => setShowEditDialog(true)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography variant="h6" gutterBottom component="div">Task Workflow</Typography>
                        {row.workflow.map((workflowRow, idx) => (
                            <Box sx={{ margin: 1 }} key={idx} >
                                <p style={{ fontWeight: "bold" }}>Changes done on {Moment(workflowRow.dateOfChange).format('MMMM Do YYYY, h:mm A')}</p>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontWeight: "bold" }}>Field</TableCell>
                                            <TableCell align="center" style={{ fontWeight: "bold" }}>Old Value</TableCell>
                                            <TableCell align="center" style={{ fontWeight: "bold" }}>New Value</TableCell>
                                            <TableCell align="center" style={{ fontWeight: "bold" }}>Remarks</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {workflowRow.workflowData.map((workflowDataRow, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell align="center" component="th" scope="row">{workflowDataRow.fieldValue}</TableCell>
                                                <TableCell align="center">
                                                    {(typeof workflowDataRow.oldValue !== "number" && dayjs(workflowDataRow.oldValue.split('T')[0], 'YYYY-MM-DD', true).isValid()) ? Moment(workflowDataRow.oldValue).format('MMMM Do YYYY, h:mm A') : workflowDataRow.oldValue}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {(typeof workflowDataRow.newValue !== "number" && dayjs(workflowDataRow.newValue.split('T')[0], 'YYYY-MM-DD', true).isValid()) ? Moment(workflowDataRow.newValue).format('MMMM Do YYYY, h:mm A') : workflowDataRow.newValue}
                                                </TableCell>
                                                <TableCell align="center">{workflowDataRow.remarks}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        ))}
                    </Collapse>
                </TableCell>
            </TableRow>


            {showViewDialog && < FormTask actionType={'view'} taskItem={row} setShowViewDialog={setShowViewDialog} />}
            {showEditDialog && < FormTask actionType={'edit'} taskItem={row} setShowEditDialog={setShowEditDialog} openEditAlertHandler={openEditAlertHandler} openEmptyEditAlertHandler={openEmptyEditAlertHandler} taskDetailsEditPassHandler={taskDetailsEditPassHandler} />}

        </React.Fragment >
    );
}

const ListTask = (props) => {

    const { taskData } = props;

    const [openEditAlert, setOpenEditAlert] = useState(false);
    const [openEmptyEditAlert, setOpenEmptyEditAlert] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const taskDataRowEdit = (data) => { props.taskDataEdit(data); }

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 5 }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" gutterBottom component="div">Task Board</Typography>
                    </Grid>
                    <Grid item>
                        {/* <TextField
                            fullWidth
                            required
                            label="Search"
                            placeholder="Search"
                            InputLabelProps={{ shrink: true }}
                        /> */}
                    </Grid>
                </Grid>
                <Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><DashboardCustomizeIcon /></TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Task Id</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Title</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Deadline</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Priority</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Progress</TableCell>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {taskData && taskData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <Row key={row.id} row={row} setOpenEditAlert={setOpenEditAlert} setOpenEmptyEditAlert={setOpenEmptyEditAlert} taskDataRowEdit={taskDataRowEdit} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 20, 50]}
                        component="div"
                        count={taskData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
                <Snackbar open={openEditAlert} autoHideDuration={2500} onClose={() => setOpenEditAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => setOpenEditAlert(false)} severity="success" sx={{ width: '100%' }}>
                        Task updated successfully
                    </Alert>
                </Snackbar>
                <Snackbar open={openEmptyEditAlert} autoHideDuration={2500} onClose={() => setOpenEmptyEditAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => setOpenEmptyEditAlert(false)} severity="error" sx={{ width: '100%' }}>
                        Please check the required fields
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}

export default ListTask;