import * as React from "react"
import IProcedure from "../../types/procedure.type";
import { Button, Card, CardHeader, Checkbox, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { getProcedures } from "../../services/skill.service";

function not(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly IProcedure[], b: readonly IProcedure[]) {
    return [...a, ...not(b, a)];
}

interface Props {
    skill_id: string
}

export const ListItemCustom: React.FC<Props> = ({ skill_id }) => {
    const [procedures, setProcedures] = React.useState<readonly IProcedure[]>([]);
    const [proceduresSelected, setProceduresSelected] = React.useState<readonly IProcedure[]>([]);
    const [checked, setChecked] = React.useState<readonly IProcedure[]>([]);
    const leftChecked = intersection(checked, procedures);
    const rightChecked = intersection(checked, proceduresSelected);

    const listProcedures = async (skill_id: string) => {
        const all = await getProcedures(skill_id);
        setProcedures(all);
    }

    React.useEffect(() => {
        listProcedures(skill_id);
    }, []);

    const handleToggle = (value: IProcedure) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly IProcedure[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly IProcedure[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setProceduresSelected(proceduresSelected.concat(leftChecked));
        setProcedures(not(procedures, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setProcedures(procedures.concat(rightChecked));
        setProceduresSelected(not(proceduresSelected, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title: React.ReactNode, items: readonly IProcedure[]) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: any) => {
                    return (
                        <ListItemButton
                            key={value.id}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': value.name,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value.id} primary={value.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList('Choices', procedures)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList('Chosen', proceduresSelected)}</Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}