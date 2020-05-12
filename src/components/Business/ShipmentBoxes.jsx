import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import shipments from "../../Storage";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import "../../index.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: "start",
    flexDirection: "column",
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    marginTop: 20,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

/**
 *
 * @param id
 * @returns {*}
 */
const getShipment = (id) => {
  return shipments.getShipments().find(s => s.id === id);
}

/**
 *
 * @param shipment
 * @returns {Array}
 */
const calculateObjects = (shipment) => {
  // TODO: handle null values.
  return shipment.boxes !== null ? shipment.boxes.trim().split(",").map((unit, i) => {
    if (unit.length > 0) return {key: i, label:parseFloat(unit)}
  }) : []
}

export default function ChipsArray(props) {
  const { shipmentId } = props;
  const shipment = getShipment(shipmentId)
  const classes = useStyles();
  const [chipData, setChipData] = useState(calculateObjects(shipment));
  const [number, setNumber] = useState(0)
  useEffect(() => {setChipData(calculateObjects(shipment)); getShipment(shipmentId).boxes = ""}, [shipment])


  /**
   * Delete an object from chipData array and update shipments in database.
   *
   * @param {Object} chipToDelete - chip object to delete
   * @returns {function(...[*]=)}
   */
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

    getShipment(shipmentId).boxes = chipData.map(r => {
      return r.label
    }).join()
    // TODO : update shipments without delay.
    console.log(getShipment(shipmentId).boxes)
  };

  /**
   * Add a number to the shipment string.
   */
  const handleNumberAdd = () => {
    let boxesString = chipData !== [] ? chipData.map(r => {
      return r.label
    }) : ""
    getShipment(shipmentId).boxes = `${boxesString},${number}`
    setChipData(calculateObjects(getShipment(shipmentId)))
    setNumber(0)
  }

  /**
   * Update state when input field value changes.
   *
   * @param e
   */
  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  }

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" onChange={handleNumberInputChange} value={number} type={"number"}/>
          </Grid>
          <Grid item>
            <AddIcon className={"add-button"} onClick={handleNumberAdd} />
          </Grid>
        </Grid>
      </div>
    <div style={{display: "flex", marginTop: 10,}}>
      {chipData.map((data) => {
        return (
          <div key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </div>
        );

      })}</div>

    </div>
  );
}
