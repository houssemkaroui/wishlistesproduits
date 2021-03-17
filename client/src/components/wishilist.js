import React, { useEffect } from "react";
import GridOn from '@material-ui/icons/GridOn';
import List from '@material-ui/icons/List';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { StyledTableRow, StyledTableCell, useStyles6 } from "./antTabs";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';

const columns = [
  { id: 'file', label: 'Image', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'decription', label: 'Discription', display: '-webkit-box', align: 'left' },
  { id: 'statue', label: 'Statue', minWidth: 170, align: 'right', },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right', },
];

const useStyles8 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
export const Wishlist = ({ produitsliste, mode }) => {

  const classes = useStyles6();
  const classes2 = useStyles8();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    console.log(newPage, "paaaaaaaaaaa")
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <div>
      {
        mode ?
          <div className={classes2.root} style={{ marginTop: 40 }}>
            <GridList cellHeight={180} className={classes2.gridList}>

              {produitsliste.map((tile) => (
                <GridListTile key={tile.file}>
                  <img src={'https://sleepy-beach-59476.herokuapp.com/photos/' + tile.file} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}

                    actionIcon={
                      <IconButton aria-label={`info about ${tile.title}`} className={classes2.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>


          :


          <div style={{ marginTop: 20 }}>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>



                  <TableBody>

                    {produitsliste.map((row) => (

                      <StyledTableRow key={row.title}>
                        <StyledTableCell component="th" scope="row">
                          <img src={'https://sleepy-beach-59476.herokuapp.com/photos/' + row.file} className="img" />
                        </StyledTableCell>
                        <StyledTableCell>{row.title}</StyledTableCell>
                        <StyledTableCell >{row.decription}</StyledTableCell>
                        {
                          row.statue == 1 ? <StyledTableCell align="right">To Buy</StyledTableCell> :
                            <StyledTableCell align="right">Bought</StyledTableCell>
                        }
                        <StyledTableCell align="right">{row.price}</StyledTableCell>



                      </StyledTableRow>
                    ))}
                  </TableBody >

                </Table>
              </TableContainer>{
                produitsliste.length == 0 ? <div style={{ left: 500, position: 'relative' }} ><h>No Produits</h></div> : ''
              }

              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"

                count={produitsliste.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

            </Paper>
          </div>
      }
    </div>


  )


}



