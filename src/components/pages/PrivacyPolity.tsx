import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}));

export const PrivacyPolity = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Política de Privacidade
            </Typography>
            <Typography variant="body1" paragraph>
                Última atualização: 06-04-2024
            </Typography>
            <Typography variant="body1" paragraph>
                Esta Política de Privacidade descreve como Follow-up coleta, usa e compartilha informações quando você utiliza nosso aplicativo.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Informações Coletadas
            </Typography>
            <Typography variant="body1" paragraph>
                - Informações Fornecidas por Você: Podemos coletar informações que você nos fornece quando utiliza o aplicativo, tais como dados de login, informações de perfil e quaisquer outras informações que você escolher fornecer.
            </Typography>
            <Typography variant="body1" paragraph>
                - Informações de Uso: Podemos coletar informações sobre como você utiliza o aplicativo, incluindo interações com os recursos disponíveis.
            </Typography>
            <Typography variant="body1" paragraph>
                - Informações de Dispositivo: Podemos coletar informações sobre o dispositivo que você está usando para acessar o aplicativo, incluindo modelo de dispositivo, sistema operacional e identificadores exclusivos.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Uso das Informações
            </Typography>
            <Typography variant="body1" paragraph>
                - As informações coletadas são utilizadas para fornecer, manter, proteger e melhorar o aplicativo, além de desenvolver novos recursos.
            </Typography>
            <Typography variant="body1" paragraph>
                - Utilizamos as informações para personalizar sua experiência dentro do aplicativo e fornecer conteúdo relevante.
            </Typography>
            <Typography variant="body1" paragraph>
                - Podemos utilizar informações para fins de análise e pesquisa, visando melhorar nossos serviços e entender as necessidades dos usuários.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Compartilhamento de Informações
            </Typography>
            <Typography variant="body1" paragraph>
                - Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para operar, manter ou melhorar o aplicativo, ou quando exigido por lei.
            </Typography>
            <Typography variant="body1" paragraph>
                - Podemos compartilhar informações de forma agregada ou anonimizada, de modo que não possam ser utilizadas para identificar você pessoalmente.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Segurança
            </Typography>
            <Typography variant="body1" paragraph>
                - Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </Typography>
            <Typography variant="body1" paragraph>
                - No entanto, é importante ressaltar que nenhum método de transmissão ou armazenamento eletrônico é totalmente seguro, e não podemos garantir a segurança absoluta das informações.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Alterações nesta Política de Privacidade
            </Typography>
            <Typography variant="body1" paragraph>
                - Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças nas práticas de privacidade. Recomendamos que você revise esta página regularmente para ficar ciente de quaisquer alterações.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Contato
            </Typography>
            <Typography variant="body1" paragraph>
                - Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o uso de suas informações, entre em contato conosco em contato@followupbrasil.com.
            </Typography>
            <Typography variant="body1" paragraph>
                Ao utilizar o aplicativo Follow-up, você concorda com os termos desta Política de Privacidade.
            </Typography>
        </Container>
    );
}