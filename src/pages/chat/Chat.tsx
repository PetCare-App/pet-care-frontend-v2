import { Search } from '@mui/icons-material';
import { Input } from '@mui/joy';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const Chat = () => {
    const [prompt, setPrompt] = useState('');
    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '40px 0px',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: 20,
                            fontWeight: 500,
                            width: '600px',
                            textAlign: 'center',
                        }}
                    >
                        Faça uma pergunta breve sobre a saúde do seu pet para um
                        diagnóstico rápido
                    </Typography>
                    <Grid
                        container
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        <Input
                            onChange={(e) => setPrompt(e.target.value)}
                            sx={{ width: '400px', mr: '20px' }}
                        />
                        <IconButton size="large">
                            <Search sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
