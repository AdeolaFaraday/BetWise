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
       result: [],
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
           error: data.message,
           loading: false
         })
       } else {
         setValues({
           ...values,
           loading: false,
           result: data.firstTeam_lastResults
         })
       }
     })
   }

   const prediction = arr => {
     let drawArr = arr.filter((a) => a.match_hometeam_score == a.match_awayteam_score)
     let homeArr = arr.filter((a) => a.match_hometeam_name == teamName)
     let fArr = arr.filter((a) => a.match_awayteam_name == teamName && a.match_awayteam_score > a.match_hometeam_score)
     let sArr = arr.filter((a) => a.match_hometeam_name == teamName && a.match_hometeam_score > a.match_awayteam_score)
     let newArr = [...fArr, ...sArr]
     return `${teamName} has won ${newArr.length / arr.length * 100}% i.e ${newArr.length} of their last ${arr.length} matches &
     ${sArr.length / homeArr.length * 100}% i.e ${sArr.length} of their last ${homeArr.length} home matches, also drew ${drawArr.length} of their last ${arr.length} matches
     `
   }

   const errorMsg = () => (
     error && ( <div  className="msg"><div className = "alert alert-danger error"> <p> {
       error
     } </p></div>
     </div>)
   )

   const predictionMsg = () => (
     result.length > 1 && ( <div  className="msg"><div className = "alert alert-warning error"><p><i style={{marginRight:"3px"}} class="fas fa-exclamation-triangle"></i>{prediction(result)}</p></div>
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
   {predictionMsg()}
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
