import React, { useCallback, useRef, useState } from 'react'
import { Form,
  Button,
  TextInput,
  Tile,
  InlineNotification,
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
  AccordionItem,
  Accordion,
  Tab,
  Tabs,
  FormGroup,
  ComboBox
  } from 'carbon-components-react'
import { useAuth } from '../../contexts/AuthContext'
import { firestore } from "../../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import NumberFormat from 'react-number-format';
import '../../styles/components/AddTransaction.scss';

// Transaction Description field.
export function TransactionDescription(props) {
  const value = props.value ? props.value : ""

  return <TextInput
    labelText="Descrição"
    id="transaction-description"
    invalidText="Invalid error message."
    placeholder="aaa"
    ref={props.transactionRef}
    invalid={false}
    defaultValue={value}
  />
}

// Transaction Date field.
export function TransactionDate(props) {
  const value = props.value ? new Date(props.value * 1000) : "";

  return <DatePicker dateFormat="Y/m/d" datePickerType="single" ref={props.transactionRef} size="lg" value={value}>
    <DatePickerInput
      id="transaction-date"
      placeholder=""
      labelText="Data"     
      pattern="\d{4}\/\d{1,2}\/\d{1,2}"
      invalid={false}
      invalidText="Data Invalida"
    />
  </DatePicker>
}

// Transaction Type field.
export function TransactionType(props) {
  return <ComboBox
    id="transaction-type"
    titleText="Tipo"
    placeholder=""
    items={props.options}
    itemToString={(item) => (item ? item.text : '')}
    ref={props.transactionRef}
    onChange={() => {}}
  />
}

// Transaction Amount field.
export function TransactionAmount(props) {
  return <><label htmlFor="number-id" className="bx--label">Valor</label>
    <NumberFormat 
      id="number-id"
      className="bx--text-input bx--text__input" 
      decimalSeparator=","
      thousandSeparator="."
      decimalScale="2"
      fixedDecimalScale={true}
      prefix={'$'}
      placeholder="$0,00"
      ref={props.transactionRef}
    />
  </>
}

// Transaction Category field.
export function TransactionCategory(props){
  return <ComboBox
    id="transaction-category"
    titleText="Categoria"
    placeholder=""
    items={props.options}
    itemToString={(item) => (item ? item.text : '')}
    ref={props.transactionRef}
    onChange={() => {}}
  />
}

// Transaction Cost Center field.
export function TransactionCostCenter(props) {
  return <ComboBox
    id="transaction-cost-center"
    titleText="Centro de Custo"
    placeholder=""
    items={props.options}
    itemToString={(item) => (item ? item.text : '')}
    ref={props.transactionRef}
    onChange={() => {}}
  />
}

// Transaction Status field.
export function TransactionStatus(props) {
  return <FormGroup legendText="Status" >
    <RadioButtonGroup
      defaultSelected="paid"
      legend="status"
      name="transaction-status-group"
      valueSelected="paid"
      orientation="vertical"
      ref={props.transactionRef}
    >
      <RadioButton id="transaction-status-paid" labelText="Pago" value="paid" />
      <RadioButton id="transaction-status-pending" labelText="Pendente" value="pending" />
    </RadioButtonGroup>
  </FormGroup>  
}

// Transaction Frequency field.
export function TransactionFrequency(props) {
  return <FormGroup legendText="Frequencia" >
    <RadioButtonGroup
      defaultSelected="fixed"
      legend="frequency"
      name="transaction-frequency-group"
      valueSelected="fixed"
      orientation="vertical"
      ref={props.transactionRef}
    >
      <RadioButton id="transaction-frequency-fixed" labelText="Fixo" value="fixed" />
      <RadioButton id="transaction-frequency-variable" labelText="Variável" value="variable" />
    </RadioButtonGroup>
  </FormGroup>
}

// Transaction Currency field.
export function TransactionCurrency(props) {
  return <ComboBox
    id="transaction-currency"
    titleText="Moeda"
    placeholder=""
    items={props.options}
    itemToString={(item) => (item ? item.text : '')}
    initialSelectedItem={props.options.find(el => el.text === 'BRL')}
    ref={props.transactionRef}
    onChange={() => {}}
  />
}

// Transaction Currency Convertion Rate field.
export function TransactionCurrencyConvertionRate(props) {
  return <><label htmlFor="transaction-currency-convertion-rate" className="bx--label">Valor de conversão</label>
    <NumberFormat 
      id="transaction-currency-convertion-rate"
      className="bx--text-input bx--text__input" 
      decimalSeparator=","
      thousandSeparator="."
      decimalScale="5"
      fixedDecimalScale={true}
      value="1,00"
      ref={props.transactionRef}
    /></>
}

// Transaction Amount Converted field.
export function TransactionAmountConverted(props) {
  return <><label htmlFor="transaction-amount-converted" className="bx--label">Valor Convertido</label>
    <NumberFormat 
      id="transaction-amount-converted"
      className="bx--text-input bx--text__input" 
      decimalSeparator=","
      thousandSeparator="."
      decimalScale="2"
      fixedDecimalScale={true}
      prefix={'$'}
      placeholder="$0,00"
      ref={props.transactionRef}
    /></>
}

// Transaction Stock Quantity field.
export function TransactionStockQuantity(props) {
  return <><label htmlFor="transaction-stock-quantity" className="bx--label">Quantidade de Ativos</label>
    <NumberFormat 
      id="transaction-stock-quantity"
      className="bx--text-input bx--text__input" 
      decimalSeparator=","
      thousandSeparator="."
      decimalScale="8"
      placeholder="0,00"
      ref={props.transactionRef}
    /></>
}

// Transaction Stock Ticker field.
export function TransactionStockTicker(props) {
  return <><TextInput
    labelText="Ticker do Ativo"
    id="transaction-stock-ticker"
    invalidText="Invalid error message."
    placeholder=""
    ref={props.transactionRef}
    defaultValue={props.value ? props.value : ""}
    /></> 
}

// Transaction Stock Price field.
export function TransactionStockPrice(props) {
  return <><label htmlFor="transaction-stock-price form-item-transaction-stock-price" className="bx--label">Preço do Ativo</label>
    <NumberFormat 
      id="transaction-stock-price"
      className="bx--text-input bx--text__input" 
      decimalSeparator=","
      thousandSeparator="."
      decimalScale="2"
      fixedDecimalScale={true}
      prefix={'$'}
      placeholder="$0,00"
      ref={props.transactionRef}
    /></>
}

export default function AddTransaction({getTransactions}) {
  const transactionDateRef = useRef();
  const transactionDescriptionRef = useRef();
  const transactionStockQuantityRef = useRef();
  const transactionStockTickerRef = useRef();
  const transactionStockPriceRef = useRef();
  const transactionCurrencyRef = useRef();
  const transactionConversionRateRef = useRef();
  const transactionAmountRef = useRef();
  const transactionAmountBRLRef = useRef();
  const transactionTypeRef = useRef();
  const transactionStatusRef = useRef();
  const transactionCategoryRef = useRef();
  const transactionCostCenterRef = useRef();
  const transactionFrequencyRef = useRef();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldValidation, setFieldValidation] = useState(false);

  const { currentUser } = useAuth();

  const categories = [
    { id: "category-option-ajuda", text: "Ajuda"},
    { id: "category-option-agua", text: "Água"},
    { id: "category-option-alimentação", text: "Alimentação"},
    { id: "category-option-aluguel", text: "Aluguel"},
    { id: "category-option-assinatura", text: "Assinatura"},
    { id: "category-option-ativo", text: "Ativo"},
    { id: "category-option-beneficio", text: "Benefício"},
    { id: "category-option-doação", text: "Doação"},
    { id: "category-option-educação", text: "Educação"},
    { id: "category-option-eletrônico", text: "Eletrônico"},
    { id: "category-option-energia-eletrica", text: "Energia elétrica"},
    { id: "category-option-esporte", text: "Esporte"},
    { id: "category-option-freela", text: "Freela"},
    { id: "category-option-geral", text: "Geral"},
    { id: "category-option-rendimento", text: "Rendimento"},
    { id: "category-option-role", text: "Role"},
    { id: "category-option-salario", text: "Salário"},
    { id: "category-option-saúde", text: "Saúde"},
    { id: "category-option-taxas", text: "Taxas"},
    { id: "category-option-transferencia", text: "Transferência"},
    { id: "category-option-transporte", text: "Transporte"},
    { id: "category-option-viagens", text: "Viagens"},
  ]

  const currencies = [
    { id: "currency-option-brl", text: "BRL" },
    { id: "currency-option-usd", text: "USD" },
  ]

  const types = [
    { id: "type-option-receita", text: "Receita"},
    { id: "type-option-despesa", text: "Despesa"},
    { id: "type-option-transferencia-saida", text: "Transferência"},
    { id: "type-option-compra-ativo", text: "Compra Ativo"},
    { id: "type-option-venda-ativo", text: "Venda Ativo"},
  ]

  const statuses = [
    { id: "status-option-", text: "Pago"},
    { id: "status-option-", text: "Pendente"},
  ]

  const costCenters = [
    { id: "cost-center-option-nu-credito", text: "Nu Crédito"},
    { id: "cost-center-option-nu-debito", text: "Nu Débito"},
    { id: "cost-center-option-mercado-page", text: "Mercado Pago"},
    { id: "cost-center-option-cp-investimentos", text: "XP Investimentos"},
    { id: "cost-center-option-avenue", text: "Avenue"},
    { id: "cost-center-option-crypto-btc", text: "Crypto BTC"},
    { id: "cost-center-option-crypto-eth", text: "Crypto ETH"},
  ]

  const frequencies = [
    { id: "frequency-option-fixo", text: "Fixo"},
    { id: "frequency-option-variavel", text: "Variável"},
  ]

  async function handleSubmit(e) {
    e.preventDefault();
    const transactionId = "transaction-" + uuid();

    try {
      setError('');
      setLoading(true);

      await setDoc(doc(firestore, currentUser.email, transactionId), {
        date: Timestamp.fromDate(new Date(transactionDateRef.current.inputField.value)),
        description: transactionDescriptionRef.current.value,
        stockQuantity: Number(transactionStockQuantityRef.current.state.numAsString),
        stockTicker: transactionStockTickerRef.current.value,
        stockPrice: Number(transactionStockPriceRef.current.state.numAsString),
        currency: transactionCurrencyRef.current.state.inputValue,
        conversionRate: Number(transactionConversionRateRef.current.state.numAsString),
        amount: Number(transactionAmountRef.current.state.numAsString),
        amountBRL: Number(transactionAmountBRLRef.current.state.numAsString),
        type: transactionTypeRef.current.state.inputValue,
        status: transactionStatusRef.current.state.selected,
        category: transactionCategoryRef.current.state.inputValue,
        costCenter: transactionCostCenterRef.current.state.inputValue,
        frequency: transactionFrequencyRef.current.state.selected
      });

      setMessage('Transação adicionada')

    } catch {
      setError('Falha ao adicionar transação');
    }
    setLoading(false)
    getTransactions();
  }

  function inputValidation() {
    /* console.log('testref')
    console.log('ref'); */
  }

  const TransactionForm = () => {
    return <Form onSubmit={handleSubmit}>
      <div className="bx--grid bx--grid--narrow">      
        <div className="bx--row">
          <div className="bx--col form-item form-item-transaction-date">                  
            <TransactionDate transactionRef={transactionDateRef}/>
          </div>

          <div className="bx--col form-item form-item-transaction-type">
            <TransactionType transactionRef={transactionTypeRef} options={types}/>
          </div>

          <div className="bx--col form-item form-item-transaction-description">
            <TransactionDescription transactionRef={transactionDescriptionRef}/>
          </div>

          {/* Amount */}
          <div className="bx--col form-item form-item-transaction-amount">
            <TransactionAmount transactionRef={transactionAmountRef}/>
          </div>

          {/* Category */}
          <div className="bx--col form-item form-item-transaction-category">
            <TransactionCategory transactionRef={transactionCategoryRef} options={categories}/>
          </div>
        
          {/* Cost Center */}
          <div className="bx--col form-item form-item-transaction-cost-center">
            <TransactionCostCenter transactionRef={transactionCostCenterRef} options={costCenters}/>
          </div>

          {/* Status */}
          <div className="bx--col-lg-1 form-item form-item-transaction-status">
            <TransactionStatus transactionRef={transactionStatusRef}/>
          </div>
        </div>
          
        <div className="bx--row more-details-row">
          <Accordion size="sm">
            <AccordionItem title="Mais detalhes">
              <Tabs>
                <Tab id="tab-frequency" label="Frequência">
                  <div className="bx--col-lg-1 form-item form-item-transaction-frequency">
                    <TransactionFrequency transactionRef={transactionFrequencyRef}/>
                  </div>
                </Tab>

                <Tab id="tab-currency" label="Moeda">
                  <div className="bx--row">
                    <div className="bx--col-lg-2 form-item form-item-transaction-currency">
                      <TransactionCurrency transactionRef={transactionCurrencyRef} options={currencies}/>
                    </div>

                    <div className="bx--col-lg-2 form-item form-item-transaction-currency-covertion-rate">
                      <TransactionCurrencyConvertionRate transactionRef={transactionConversionRateRef}/>
                    </div>

                    <div className="bx--col-lg-2 form-item form-item-transaction-amount-converted">
                      <TransactionAmountConverted transactionRef={transactionAmountBRLRef}/>
                    </div>
                  </div>
                </Tab>

                <Tab id="tab-stocks" label="Ativos">
                  <div className="bx--row">
                    <div className="bx--col-lg-2 form-item form-item-transaction-stock-quantity">
                      <TransactionStockQuantity transactionRef={transactionStockQuantityRef}/>
                    </div>

                    <div className="bx--col-lg-2 form-item form-item-transaction-stock-ticker">
                      <TransactionStockTicker transactionRef={transactionStockTickerRef}/>
                    </div>

                    <div className="bx--col-lg-2 form-item form-item-transaction-stock-price">
                      <TransactionStockPrice transactionRef={transactionStockPriceRef}/>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </AccordionItem>
          </Accordion>              
          <div className="button-add-transaction-wrapper">
            <Button className="text-right" disabled={loading} kind="primary" tabIndex={0} type="submit" >
              Adicionar
            </Button>
          </div> 
        </div>  

                 
      </div>
    </Form>
  }

  return (
    <div className="transaction-container">
      
      <Tile>
        <h3 className="text-left" >Nova Transação</h3>

        {error &&
          <InlineNotification
            iconDescription="Fechar"
            timeout={0}
            title={error}
            kind="error"
          />}
        {message &&
          <InlineNotification
            iconDescription="Fechar"
            timeout={0}
            title={message}
            kind="success"
          />}

        <TransactionForm />
      </Tile>
    </div>
  )
}
