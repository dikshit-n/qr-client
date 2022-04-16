import { AsyncDivSpinner, TableHeader } from "@/components";
import { Card, Box, Divider } from "@mui/material";
import { CUSTOM_CARD_PROPS } from "@/model";
import { styled } from "@mui/material";

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const CustomCard: React.FC<CUSTOM_CARD_PROPS> = (props) => {
  const {
    loading,
    cardHeader,
    containerProps = {},
    cardBodyProps = {},
    ...rest
  } = props;

  let CardHeader: any = null;
  if (cardHeader) {
    const { header, actions, ...restCardHeader } = cardHeader;
    CardHeader = (
      <TableHeader
        header={header}
        actions={actions}
        {...restCardHeader}
        sx={{
          px: cardHeader?.headerInsideCard ? 2 : 0,
          py: 2 /* cardHeader?.headerInsideCard ? 0 : 2 */,
          ...restCardHeader.sx,
        }}
      />
    );
  }

  return (
    <CardContainer
      {...containerProps}
      sx={{ m: 2, ...containerProps.sx }}
      className={["custom-scrollbar", containerProps?.className]
        .filter((el) => el)
        .join(" ")}
    >
      {!cardHeader?.headerInsideCard && CardHeader}
      <Card {...rest}>
        {cardHeader?.headerInsideCard && (
          <>
            {CardHeader}
            <Divider sx={{ mt: 1 }} />
          </>
        )}
        <Box {...cardBodyProps} sx={{ p: 2, ...cardBodyProps.sx }}>
          {loading ? <AsyncDivSpinner /> : props.children}
        </Box>
      </Card>
    </CardContainer>
  );
};
