import React, {useState, useEffect} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
    loader: {
        margin: '10vw'
    },
    container: {
        textAlign: 'center'
    },
    addNew: {
        backgroundColor: 'green',
        margin: '50px auto',
        color: 'white'
    },
    editContainer: {
        backgroundColor: 'white',
        textAlign: 'left'
    },
    textField: {
        width: '200px',
        margin: '50px'
    },
    textFieldButton: {
        width: '200px',
        margin: '50px',
        backgroundColor: 'green',
        color: 'white'
    },
    editButton: {
        backgroundColor: '#92A1CF'
    },
    deleteButton: {
        backgroundColor: '#FF1C00'
    }
  }));

function SingleStock(props) {
    const [stock, setStock] = useState({})
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState({
        status: true,
        stock: ''
    })
    const [newStock, setNewStock] = useState({
        name: '',
        ticker: '',
        date: '',
        url: '',
        description: ''
    })
    const classes = useStyles();

    useEffect(() => {
        function onLoad() {
            const id = props.match.params.id;
            axios.get(`/api/stocks/single`, {params: {id}})
            .then(res => {
                setStock(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
        onLoad()
      }, [])

    const displayStocks = () => {
       return stock.stocks.map((s, index) => {
            return (
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {s.name}
                </TableCell>
                <TableCell align="right">{s.ticker}</TableCell>
                <TableCell align="right">{s.url}</TableCell>
                <TableCell align="right">{s.date}</TableCell>
                <TableCell align="right">{s.description}</TableCell>
                <TableCell align="right"><Button className={classes.editButton} onClick={() => setEditing(true)}>Edit</Button></TableCell>
                <TableCell align="right"><Button className={classes.deleteButton} onClick={() => deleteStock(index)}>Delete</Button></TableCell>
              </TableRow>
            )
        })
    }

    const displayStocksEditing = () => {
       return stock.stocks.map((s, index) => {
           if (editing.stock === index) {
               const obj = {
                   name: s.name,
                   ticker: s.ticker,
                   url: s.url,
                   date: s.date,
                   description: s.description
               }
               return(
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <TextField defaultValue={s.name} className={classes.textField} id="standard-basic" label="Stock Name" onChange={event => obj.name = event.target.value} />
                    </TableCell>
                    <TableCell align="right">
                        <TextField defaultValue={s.ticker} className={classes.textField} id="standard-basic" label="Ticker" onChange={event => obj.ticker = event.target.value} />
                    </TableCell>
                    <TableCell align="right">
                        <TextField defaultValue={s.url} className={classes.textField} id="standard-basic" label="URL" onChange={event => obj.url = event.target.value} />  
                    </TableCell>
                    <TableCell align="right">
                        <TextField defaultValue={s.date} className={classes.textField} id="standard-basic" label="Date" onChange={event => obj.date = event.target.value} />
                    </TableCell>
                    <TableCell align="right">
                        <TextField defaultValue={s.description} className={classes.textField} id="standard-basic" label="Description" multiline onChange={event => obj.description = event.target.value} />
                    </TableCell>
                    <TableCell align="right"><Button className={classes.editButton} onClick={() => saveEdit(obj, index)}>Save</Button></TableCell>
                    <TableCell align="right"><Button className={classes.deleteButton} onClick={() => deleteStock(index)}>Delete</Button></TableCell>
                </TableRow>   
               )
           }
            return (
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {s.name}
                </TableCell>
                <TableCell align="right">{s.ticker}</TableCell>
                <TableCell align="right">{s.url}</TableCell>
                <TableCell align="right">{s.date}</TableCell>
                <TableCell align="right">{s.description}</TableCell>
                <TableCell align="right"><Button className={classes.editButton} onClick={() => setEditing({status: true, stock: index})}>Edit</Button></TableCell>
                <TableCell align="right"><Button className={classes.deleteButton} onClick={() => deleteStock(index)}>Delete</Button></TableCell>
              </TableRow>
            )
        })
    }

    const deleteStock = (i) => {
        var confirm = window.confirm("Are you sure?")
        if(confirm === true) {
            setLoading(true)
            const newArr = stock.stocks;
            const id = stock._id;
            newArr.splice(i, 1)
            axios.post('/api/stocks/new-stock', {id: id, newArr: newArr})
            .then(res => {
                setStock(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        } 
    }

    const handleNewChange = name => event => {
        setNewStock({...newStock, [name]: event.target.value})
    }

    const handleSave = () => {
        setAdding(false)
        setLoading(true)
        const newArr = stock.stocks;
        const id = stock._id;
        newArr.push(newStock)
        axios.post('/api/stocks/new-stock', {id: id, newArr: newArr})
        .then(res => {
            setStock(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const saveEdit = (s, index) => {
        setEditing({status: false, stock: ''})
        setLoading(true)
        const arr = stock.stocks;
        arr[index] = s;
        const id = stock._id;
        axios.post('/api/stocks/new-stock', {id: id, newArr: arr})
        .then(res => {
            setStock(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const edit = () => {
        return (
            <div className={classes.editContainer}>
                <form className={classes.root} noValidate autoComplete="off" >
                    <TextField className={classes.textField} id="standard-basic" label="Stock Name" onChange={handleNewChange('name')} />
                    <TextField className={classes.textField} id="standard-basic" label="Ticker" onChange={handleNewChange('ticker')}/>
                    <TextField className={classes.textField} id="standard-basic" label="URL" onChange={handleNewChange('url')}/>
                    <TextField className={classes.textField} id="standard-basic" label="Start Date" onChange={handleNewChange('date')}/>
                    <TextField className={classes.textField} id="standard-basic" label="Description" multiline onChange={handleNewChange('description')}/>
                    <Button className={classes.textFieldButton} onClick={handleSave}>Save</Button>
                </form>
            </div>
        )
    }

      if (loading) {
          return (
            <div className={classes.loader}>
                <LinearProgress />
            </div>
          )
      } else if (editing.status === true) {
          return (
            <div className={classes.container}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Stock Name</TableCell>
                        <TableCell align="right">Ticker</TableCell>
                        <TableCell align="right">URL</TableCell>
                        <TableCell align="right">Start Date</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayStocksEditing()}
                    </TableBody>
                </Table>
                </TableContainer>
                {adding === true ? edit() : null}
                {adding === true ? 
                    <Button className={classes.addNew} onClick={() => setAdding(false)}>Cancel</Button> :
                    <Button className={classes.addNew} onClick={() => setAdding(true)}>Add New Stock</Button>
                }
            </div>
          )
      } else {
        return(
            <div className={classes.container}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Stock Name</TableCell>
                        <TableCell align="right">Ticker</TableCell>
                        <TableCell align="right">URL</TableCell>
                        <TableCell align="right">Start Date</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayStocks()}
                    </TableBody>
                </Table>
                </TableContainer>
                {adding === true ? edit() : null}
                {adding === true ? 
                    <Button className={classes.addNew} onClick={() => setAdding(false)}>Cancel</Button> :
                    <Button className={classes.addNew} onClick={() => setAdding(true)}>Add New Stock</Button>
                }
            </div>
        )
      }
}

export default SingleStock;