import { useRef, useState, useEffect } from 'react'

import { firestore } from "../../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
import  AddTransaction, { TransactionAmount, 
  TransactionDate,
  TransactionDescription,
  TransactionCategory, 
  TransactionCostCenter, 
  TransactionFrequency, 
  TransactionStatus, 
  TransactionType 
} from './AddTransaction';


import { DataTable,
  TableContainer,
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarAction,
  TableToolbarMenu,
  Button,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
  TableExpandRow,
  TableExpandedRow,
  TableExpandHeader
  } from 'carbon-components-react';

import {
    Delete16 as Delete,
    Save16 as Save,
    Download16 as Download,
    Edit32 as Edit,
  } from '@carbon/icons-react';

export default function TransactionsTable() {
  const [tableLoading, setTableLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);    
  const [editCell, setEditCell] = useState('');

  function convertDate(timestamp) {
    var date = new Date(timestamp * 1000) ;

    return date.toLocaleDateString("pt-BR")
  }

  async function getTransactions() {
    const q = await getDocs(collection(firestore, "test4@test.com"));

    var rows = [];

    q.forEach((doc) => {
      rows.push({
        id: doc.id,
        description: doc.data().description,
        amount: doc.data().amount,
        amountBRL: doc.data().amountBRL,
        category: doc.data().category,
        conversionRate: doc.data().conversionRate,
        costCenter: doc.data().costCenter,
        currency: doc.data().currency,
        date: doc.data().date.seconds,
        frequency: doc.data().frequency,
        status: doc.data().status,
        stockPrice: doc.data().stockPrice,
        stockQuantity: doc.data().stockQuantity,
        stockTicker: doc.data().stockTicker,
        type: doc.data().type
      })
    })
    setTableRows(rows);
    setTableLoading(false);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const headers = [
    { key: 'date', header: 'Date'},
    { key: 'type', header: 'Type'},
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount'},
    /* { key: 'amountBRL', header: 'amountBRL'}, */
    { key: 'category', header: 'Category'},
    /* { key: 'conversionRate', header: 'conversionRate'}, */
    { key: 'costCenter', header: 'CostCenter'},
    /* { key: 'currency', header: 'currency'}, */
    { key: 'frequency', header: 'Frequency'},
    { key: 'status', header: 'Status'},
    /* { key: 'stockPrice', header: 'stockPrice'},
    { key: 'stockQuantity', header: 'stockQuantity'},
    { key: 'stockTicker', header: 'stockTicker'}, */
  ];

  function renderCell(rowId, cell) {

    if (rowId != editCell) {
      return cell.value;
      
    }

    switch(cell.info.header) {
      case 'date':
        return <TransactionDate value={cell.value} />
      
      case 'type':
        return <TransactionType value={cell.value} />

      case 'description':
        return <TransactionDescription value={cell.value} />

      case 'amount':
        return <TransactionAmount value={cell.value} />

      case 'category':
        return <TransactionCategory value={cell.value} />

      case 'costCenter':
        return <TransactionCostCenter value={cell.value} />

      case 'frequency':
        return <TransactionFrequency value={cell.value} />

      case 'status':
        return <TransactionStatus value={cell.value} />

      default:
        return cell.value
    }
  }

  return <div >
    <DataTable rows={tableRows} headers={headers} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps,
      }) => {
        const batchActionProps = getBatchActionProps();

        return (
          <TableContainer
            title="DataTable"
            description="With batch actions"
            {...getTableContainerProps()}>
            <AddTransaction getTransactions={getTransactions}/>
            
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...batchActionProps}>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Delete}
                  /* onClick={batchActionClick(selectedRows)} */>
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Save}
                  /* onClick={batchActionClick(selectedRows)} */>
                  Save
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Download}
                  /* onClick={batchActionClick(selectedRows)} */>
                  Download
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent
                aria-hidden={batchActionProps.shouldShowBatchActions}>
                <TableToolbarSearch
                  persistent={true}
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onChange={onInputChange}
                />
                <TableToolbarMenu
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                  <TableToolbarAction onClick={() => alert('Alert 1')}>
                    Action 1
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert('Alert 2')}>
                    Action 2
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert('Alert 3')}>
                    Action 3
                  </TableToolbarAction>
                </TableToolbarMenu>
                {/* <Button
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                   onClick={} 
                  size="small"
                  kind="primary">
                  Add new
                </Button> */}
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableExpandHeader id="expand" />
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header, i) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                  <TableHeader />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <>
                    <TableExpandRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {console.log(editCell)}
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {renderCell(row.id, cell)}
                        </TableCell>                        
                      ))}
                      <TableCell className="bx--table-column-menu">
                        <Button id="transaction-edit-button" 
                          kind="ghost" 
                          renderIcon={Edit} 
                          iconDescription="Icon Description" 
                          hasIconOnly 
                          onClick={() => setEditCell(row.id)}/>
                        <Button id="transaction-delete" 
                          kind="ghost" 
                          renderIcon={Delete} 
                          iconDescription="Icon Description" 
                          hasIconOnly
                          onClick={() => setEditCell("")} />
                      </TableCell>
                    </TableExpandRow>
                    <TableExpandedRow
                      colSpan={headers.length + 1}
                      className="demo-expanded-td">
                      <h6>Expandable row content</h6>
                      <div>Description here</div>
                    </TableExpandedRow>
                    
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    </DataTable>  
  </div>
}