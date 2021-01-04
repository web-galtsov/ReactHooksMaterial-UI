import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    CardInfo: {
        display: "flex"

    },
    TypographyTitle: {
        color: '#212121',
        fontSize: '18px',
        alignItems: 'center'
    },
    TypographyInfoBoxCases: {
        color: '#212121',
        fontSize: '18px',
        alignItems: 'center'
    },
    TypographyInfoBoxTotal: {
        color: '#212121',
        fontSize: '18px',
        alignItems: 'center',
        fontWeight: '600',
    },
}));
export const AppLeft = styled.div`

`;

export const AppRight = styled.div`

`;

export const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const AppStats = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const MapContent = styled.div`


`;