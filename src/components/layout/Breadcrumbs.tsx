import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

interface BreadcrumbsProps {
    title1: string;
    href1: string;
    title2: string;
    href2: string
}

export const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({ title1, href1, title2, href2 }) => {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    component="a"
                    href="/home"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                />
                {title1 && (
                    <StyledBreadcrumb component="a" href={href1} label={title1} />
                )}
                {title2 && (
                    <StyledBreadcrumb
                        label={title2}
                        deleteIcon={<ExpandMoreIcon />}
                        onDelete={handleClick}
                    />
                )}
            </Breadcrumbs>
        </div>
    );

}