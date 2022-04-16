import { TABLE_HEADER_PROPS } from "@/model";
import { styled, Box, Typography } from "@mui/material";

const TableHeaderContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;
export const TableHeader: React.FC<TABLE_HEADER_PROPS> = (props) => {
  const { header: TableHeading, actions, ...rest } = props;
  return (
    <TableHeaderContainer {...rest}>
      {TableHeading &&
        (typeof TableHeading === "string" ? (
          <Typography variant="h3">{TableHeading}</Typography>
        ) : typeof TableHeading === "object" && "title" in TableHeading ? (
          <TitleContainer
            {...TableHeading.containerProps}
            sx={{ pt: 1, ...TableHeading.containerProps?.sx }}
          >
            {TableHeading.title &&
              (typeof TableHeading.title === "string" ? (
                <Typography variant="h3" {...TableHeading.props}>
                  {TableHeading.title}
                </Typography>
              ) : typeof TableHeading.title === "function" ? (
                <TableHeading.title {...TableHeading.props} />
              ) : (
                TableHeading.title
              ))}
            {TableHeading.description &&
              (typeof TableHeading.description === "string" ? (
                <Typography variant="subtitle2">
                  {TableHeading.description}
                </Typography>
              ) : typeof TableHeading.description === "object" &&
                "title" in TableHeading.description ? (
                <Typography
                  variant="subtitle2"
                  {...TableHeading.description.props}
                >
                  {TableHeading.description.title}
                </Typography>
              ) : (
                TableHeading.description
              ))}
          </TitleContainer>
        ) : (
          TableHeading
        ))}
      {actions}
    </TableHeaderContainer>
  );
};
