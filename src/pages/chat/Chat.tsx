import { Search } from '@mui/icons-material';
import { Input } from '@mui/joy';
import {
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

export const Chat = () => {
    const { postChat } = usePetCareContext();

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChatRequest = async (prompt: string) => {
        setLoading(true);

        const response = await postChat(prompt);
        if (response.status == 201) {
            setResponse(response.data.generatedText);
        } else {
            setResponse('Não entendi, pode repetir?');
        }

        setLoading(false);
    };
    function normalizeResponse(text: string): string {
        const ultimoPontoIndex = text.lastIndexOf('.');

        if (ultimoPontoIndex !== -1) {
            const novaString = text.substring(0, ultimoPontoIndex + 1);
            return novaString.trim();
        }
        return text;
    }

    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
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
                            width: '400px',
                            textAlign: 'center',
                        }}
                    >
                        Faça uma pergunta sobre a saúde do seu pet para um
                        diagnóstico rápido
                    </Typography>
                    <Paper
                        sx={{
                            backgroundColor: grey[200],
                            height: '300px',
                            width: 'calc(100% - 150px)',
                        }}
                        elevation={0}
                    >
                        <Grid
                            container
                            justifyContent={'center'}
                            alignContent={'center'}
                            width={'100%'}
                            height={'100%'}
                            flexDirection={'column'}
                        >
                            {!loading && (
                                <Grid width={'calc(100% - 40px)'}>
                                    <Typography>
                                        {normalizeResponse(response)}
                                    </Typography>
                                </Grid>
                            )}

                            {!!loading && (
                                <Grid
                                    container
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Typography>
                                        O chat está digitando
                                    </Typography>
                                    <CircularProgress
                                        sx={{ mt: '20px' }}
                                        color={'secondary'}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                    <Grid
                        container
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        <Input
                            onChange={(e) => setPrompt(e.target.value)}
                            sx={{ width: '400px', mr: '20px' }}
                        />
                        <IconButton
                            size="large"
                            onClick={() => {
                                handleChatRequest(prompt);
                            }}
                        >
                            <Search sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
