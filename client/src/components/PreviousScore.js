import React, {
  useState,
  useEffect
} from 'react';
import {
  getH2hResult
} from '../apiMethods';
import Result from './Sub-component/Result';
import Layout from './Layout';

const PreviousScore = () => {
    const [values, setValues] = useState({
      teamName: '',
      result: [],
      error: '',
      loading: false
    })

    const {
      teamName,
      result,
      error,
      loading
    } = values

    const handleChange = event => {
      setValues({
        ...values,
        teamName: event.target.value,
        error: ''
      })
    }


    const handleSubmit = e => {
      e.preventDefault()
      setValues({...values, loading: true, error: ''})
      getH2hResult({
        teamSelectA: teamName,
        teamSelectB: 'Liverpool'
      }).then(data => {
        console.log(data)
        if (data.error) {
          setValues({
            ...values,
            loading: false,
            error: data.error
          })
        } else {
          console.log(data)
          setValues({
            ...values,
            loading: false,
            result: data.results.firstTeam_lastResults
          })
        }
      })
    }

    const errorMsg = () => (
      error && ( <div  className="msg"><div className = "alert alert-danger error"> <p> {
        error
      } </p></div>
      </div>)
    )

    const isLoading = () => (
      loading && (
        <div  className="msg"><div className="loading"><button class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      <span class="sr-only">Loading...</span>
    </button>
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button></div></div>)
    )


  const Previous = () => {
    return(
    <div>
    {isLoading()}
    {errorMsg()}
    <form>
      <div class="select-league">
        <input type="text" className="txtb" autoFocus onChange={handleChange} value={teamName} />
        <button class="btn btn-outline-success responsive" onClick={handleSubmit} type="submit" name="button">Submit</button>
      </div>
    </form>

    <section class="result-section">
      <Result results={result} />
    </section>
  </div>
    )
  }

  return (
    <Layout>
      {Previous()}
    </Layout>
  );
}

export default PreviousScore;
