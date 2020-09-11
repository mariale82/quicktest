import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function Info() {
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      getData();
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function TablePaginationActions(props) {
    const classes = useStyles();

    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {/* {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />} */}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {/* {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )} */}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {/* {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )} */}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {/* {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />} */}
        </IconButton>
      </div>
    );
  }

  const getData = async () => {
    const res = await axios(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json"
    );
    // if (res) {
    //   console.log("hola");
    //   res.data.forEach((r) => {
    //     let gold = r.gold;
    //     let silver = r.silver;
    //     let bronze = r.bronze;
    //     let sum = gold + silver + bronze;
    //     console.log("Total medallas " + sum);
    //     r.totalTotal = sum;
    //     console.log("updated r", r);
    //   });
    // }
    console.log(res.data);
    setData(res.data);
  };

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Atleta</StyledTableCell>
              <StyledTableCell align="right">Edad</StyledTableCell>
              <StyledTableCell align="right">Pais</StyledTableCell>
              <StyledTableCell align="right">Año</StyledTableCell>
              <StyledTableCell align="right">Fecha</StyledTableCell>
              <StyledTableCell align="right">Deporte</StyledTableCell>
              <StyledTableCell align="right">Oro</StyledTableCell>
              <StyledTableCell align="right">Plata</StyledTableCell>
              <StyledTableCell align="right">Bronce</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((d) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {d.athlete}
                </StyledTableCell>

                <StyledTableCell align="right">{d.age}</StyledTableCell>
                <StyledTableCell align="right">{d.country}</StyledTableCell>
                <StyledTableCell align="right">{d.year}</StyledTableCell>
                <StyledTableCell align="right">{d.date}</StyledTableCell>
                <StyledTableCell align="right">{d.sport}</StyledTableCell>
                <StyledTableCell align="right">{d.gold}</StyledTableCell>
                <StyledTableCell align="right">{d.silver}</StyledTableCell>
                <StyledTableCell align="right">{d.bronze}</StyledTableCell>
                <StyledTableCell align="right">{d.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* <div className="row gridHeader">
        <div className="col-sm gridFont">Atleta</div>
        <div className="col-sm gridFont">Edad</div>
        <div className="col-sm gridFont">Pais</div>
        <div className="col-sm gridFont">Año</div>
        <div className="col-sm gridFont">Fecha</div>
        <div className="col-sm gridFont">Deporte</div>
        <div className="col-sm gridFont">Oro</div>
        <div className="col-sm gridFont">Plata</div>
        <div className="col-sm gridFont">Bronce</div>
        <div className="col-sm gridFont">Total</div>
      </div> */}
      {/* {data.map((d) => (
        <div className="row">
          <div className="col-sm gridRow gridFont">
            <small>{d.athlete}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.age}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.country}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.year}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.date}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.sport}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.gold}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.silver}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.bronze}</small>
          </div>
          <div className="col-sm gridRow gridFont">
            <small>{d.total}</small>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default withAuthenticationRequired(Info);
