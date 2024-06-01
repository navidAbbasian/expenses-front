import { Fade } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TablesLoading from '../loadings/TablesLoading';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TableContainer = (props) => {
    const { children, title, isLoading, handleFilter, value, placeholder } =
        props;

    const showFilter = props.showFilter !== undefined ? props.showFilter : true;

    return (
        <Fade in={true} timeout={1000}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                                pl: 2,
                                py: 1,
                            }}
                        >
                            <CardHeader
                                title={title}
                                sx={{
                                    '& .MuiCardHeader-title': {
                                        letterSpacing: '.15px',
                                        fontSize: { xs: '20px', xxl: '23px' },
                                    },
                                }}
                            />
                            {showFilter && (
                                <TextField
                                    size="small"
                                    color="info"
                                    sx={{
                                        '& input': {
                                            font: 'revert',
                                        },
                                        mr: { xs: 2, lg: 0 },
                                        minWidth: {
                                            xs: 'fit-content',
                                            lg: '17rem',
                                        },
                                    }}
                                    value={value}
                                    placeholder={placeholder}
                                    onChange={(e) =>
                                        handleFilter(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon
                                                    icon="clarity:search-line"
                                                    fontSize={23}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        </Box>
                        <Divider />
                        {isLoading ? <TablesLoading /> : <>{children}</>}
                    </Card>
                </Grid>
            </Grid>
        </Fade>
    );
};

export default TableContainer;
