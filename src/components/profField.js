import React from 'react'

function ProfField(props) {
  return (
      <div className="prof_fields">
          {props.type==="textarea"?<textarea className="prof_input" value={props.value} onChange={(e) => { props.setValue(e.target.value) }}   ></textarea>:<input type={props.type} className="prof_input" value={props.value} onChange={(e) => { props.setValue(e.target.value) }} />}
          <h3 className="profLabels">{ props.title}</h3>
     </div>
  )
}

export default ProfField