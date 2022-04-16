import { FC, ChangeEvent, useState } from "react";

import {
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { uniqId } from "@/utils";
import { CUSTOM_TABLE_PROPS } from "@/model";
import { styled } from "@mui/material";
import { AsyncDivSpinner } from "@/components";

const TableComponentContainer = styled(Card)(
  ({ theme }) => `
        min-height: fit-content;
        padding: 10px;
        max-height: calc(100vh - ${theme.header.height} - 40px);
        margin: 20px;
        display: flex;
        flex-direction: column;
    `
);

const applyFilters = (
  data: object[],
  query: string
  // filters: Filters
): object[] => {
  return data.filter((el) => {
    let matches = true;

    if (query) {
      const properties = Object.keys(el);
      let containsQuery = false;

      properties.forEach((property) => {
        if (
          typeof el[property] === "string" &&
          el[property].toLowerCase().includes(query.toLowerCase())
        ) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    // Object.keys(filters).forEach((key) => {
    //   const value = filters[key];

    //   if (value && el[key] !== value) {
    //     matches = false;
    //   }
    // });

    return matches;
  });
};

const applyPagination = (
  data: object[],
  page: number,
  limit: number
): object[] => {
  return data.slice(page * limit, page * limit + limit);
};

export const CustomTable: FC<CUSTOM_TABLE_PROPS> = (props) => {
  let {
    idAccessor: idAccessorProp,
    data,
    tableHeading: TableHeading = null,
    isSelectable = false,
    emptyMessage = "No details found",
    columns,
    renderAs = null,
    loading,
    tableHeadingProps,
  } = props;
  const idAccessor = idAccessorProp || uniqId();
  data = data.map((el) => ({ ...el, [idAccessor]: uniqId() }));
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedData(
      event.target.checked ? data.map((el) => el[idAccessor]) : []
    );
  };

  const handleSelectOneUser = (
    _event: ChangeEvent<HTMLInputElement>,
    rowId: string
  ): void => {
    if (!selectedData.includes(rowId)) {
      setSelectedData((prevSelected) => [...prevSelected, rowId]);
    } else {
      setSelectedData((prevSelected) =>
        prevSelected.filter((el) => el !== rowId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredData = applyFilters(data, query);
  const paginatedData = applyPagination(filteredData, page, limit);
  const isRowsSelected = selectedData.length > 0;
  const selectedSomeData =
    selectedData.length > 0 && selectedData.length < data.length;
  const selectedAllData = selectedData.length === data.length;

  return (
    <TableComponentContainer>
      {loading ? (
        <AsyncDivSpinner />
      ) : (
        <>
          <Box p={2}>
            {TableHeading && (
              <Box mb={2}>
                {typeof TableHeading === "string" ? (
                  <Typography variant="h3">{TableHeading}</Typography>
                ) : (
                  <TableHeading
                    {...tableHeadingProps}
                    isRowsSelected={isRowsSelected}
                    selectedRows={selectedData
                      .map((selectedId) =>
                        data.find((el) => el[idAccessor] === selectedId)
                      )
                      .filter((el) => el)}
                    isSelectable={isSelectable}
                  />
                )}
              </Box>
            )}
            <TextField
              sx={{ m: 0 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleQueryChange}
              placeholder={"Search"}
              value={query}
              size="small"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>
          <Divider />
          {paginatedData.length === 0 ? (
            <>
              <Typography
                sx={{ py: 10 }}
                variant="h3"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {emptyMessage}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer
                sx={{ flex: "auto", position: "relative" }}
                className="custom-scrollbar"
              >
                <Table>
                  <TableHead
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <TableRow
                    // sx={{
                    //   position: 'sticky',
                    //   top: 0,
                    //   backgroundColor: 'white'
                    // }}
                    >
                      {isSelectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAllData}
                            indeterminate={selectedSomeData}
                            onChange={handleSelectAllData}
                          />
                        </TableCell>
                      )}
                      {columns.map((el, key) => (
                        <TableCell {...el.headerCellProps} key={key}>
                          {typeof el.Header === "string"
                            ? el.Header
                            : el.Header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((el) => {
                      const isDataSelected = selectedData.includes(
                        el[idAccessor]
                      );
                      return (
                        <TableRow
                          hover
                          key={el[idAccessor]}
                          selected={isDataSelected}
                        >
                          {isSelectable && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isDataSelected}
                                onChange={(event) =>
                                  handleSelectOneUser(event, el[idAccessor])
                                }
                                value={isDataSelected}
                              />
                            </TableCell>
                          )}
                          {columns.map((column, key) => {
                            if (renderAs && renderAs[column.accessor]) {
                              let Component = renderAs[column.accessor];
                              return (
                                <Component
                                  value={el}
                                  Component={(cellProps) => (
                                    <TableCell
                                      {...column.bodyCellProps}
                                      {...cellProps}
                                      key={key}
                                    >
                                      {cellProps.children}
                                    </TableCell>
                                  )}
                                />
                              );
                            }
                            return (
                              <TableCell {...column.bodyCellProps} key={key}>
                                <Typography>{el[column.accessor]}</Typography>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredData.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </>
      )}
    </TableComponentContainer>
  );
};
