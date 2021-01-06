import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(2,1),
        minWidth: 180,
        maxWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBox: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    infoBoxRed: {
        borderColor: '#9990FF',
    },
    infoBoxTotal: {
    color: '#6c757d',
    fontWeight: '700 !important',
    fontSize: '0.9rem !important',
    marginTop: '15px !important'
},
    infoBoxTitle: {
        color: '#212121',
        fontWeight: '700 !important',
        fontSize: '1.15rem !important',
        marginTop: '15px !important'
    },
    ListTable: {
        height: '400px',
        overflowY: 'scroll'
    }
}));


// noinspection CssInvalidPseudoSelector,JSUnresolvedVariable
export const CardInfoBox = styled.div`
  box-shadow: 0 2px 1px -1px rgba(131, 120, 226, 0.23), 3px 4px 1px 0 rgba(131, 120, 226, 0.13), 5px 5px 8px 0 rgba(131, 120, 226, 0.12);
  border-radius: 0;
  background-color: #fff;
  border-top: ${(props) => props.borderTop};
  cursor: pointer;
  color: ${(props) => props.color};
 &:hover {
   border-top: 10px solid #F48221 ;
 }
`;

// noinspection JSUnresolvedVariable
export const InfoBoxCases  = styled.h2`
  color:${(props) => props.color};
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;

export const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 20px 0;
`;

export const AppHeaderH1 = styled.h1`
  color: #8378E2;
  font-size: 2rem;
`;

export const AppStats = styled.div`
  padding: 1rem;
`;
export const CardInfoBoxTable = styled.div`
  box-shadow: 0 2px 1px -1px rgba(131, 120, 226, 0.23), 3px 4px 1px 0 rgba(131, 120, 226, 0.13), 5px 5px 8px 0 rgba(131, 120, 226, 0.12);
  border-radius: 0;
  background-color: #fff;
  margin-top: 112px;
  border-top: 10px #8378e2 solid;
`;
export const AppInformation = styled.h3`
  color: #8378E2;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;