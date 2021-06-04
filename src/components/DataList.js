import React, {useState,useEffect} from 'react'


import styled from 'styled-components'
import uniqid from 'uniqid'

//redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {fetchData} from '../reducers/dataSlice'

//components
import NavBar from './NavBar'
import EditForm from './EditForm'

//extras
import dateFormatter from '../modules-extras/dateFormatter/dateFormatter'

/*eslint-disable eqeqeq*/
/* eslint-disable no-useless-escape */

const TableDiv = styled.div`
margin-top:100px;
`
const DataTable = styled.table`
.table-row-header{
    background: linear-gradient(to right, #ad5389, #3c1053); 
    color:white;
}
.table-row-data:hover{
    background: #ad5389; /* fallback for old browsers */
    background: linear-gradient(to right, #ad5389, #3c1053); 
    color:white;
    cursor:pointer;

}
td{
    border-collapse: collapse;
    border:solid black 1px;

}
th{
    width:100px;
    font-size:small;
    padding:5px;
}
text-align: center;
height: 50vh;
border:solid black 1px;
width:800px;
margin:auto;

`

const List = () => {

    const dispatch = useDispatch();

    let data = useSelector((state) => state.data.data.dataFromDB);
    const currentUser = useSelector((state)=>state.user.user.userDetails.email)
    const [showModal,setshowModal] = useState(false);
    const [itemToModify, setItemToModify] = useState(null)

    const update = useSelector((state)=>state.data.data.update)


    useEffect(() => {
        
        dispatch(fetchData({currentUser}));



        return () => {

        }
    }, [dispatch, currentUser, update])

 
    const closeModal = () =>{
        setshowModal(false);
    }

    const edit = (item) =>{
        setItemToModify(item);
        setshowModal(true);
    }


    const displayDataFromDB = () =>{
        return(
            <TableDiv>
                { data == null || data.length==0? <>No data...</>: 
                <DataTable>
                    <tbody>
                        <tr className='table-row-header'>
                            <th>Patient Name</th>
                            <th>Symptoms present at time of testing</th>
                            <th>High risk exposure 14 days before test data</th>
                            <th>Immunocompromised</th>
                            <th>Lab Collection Date</th>
                            <th>Symptom Onset Date</th>
                        </tr>
                         {/* { data==null ? null:  */}
                            {data.map((item,index)=>(
                            <tr key={uniqid()}  onClick={()=>edit(item)} className='table-row-data'>
                                <td>{item.docData.patient}</td>
                                <td>{item.docData.symptomsAtTimeOfTesting? <>yes</>: <>no</>}</td>
                                <td>{item.docData.exposure14DaysBeforeTestDate? <>yes</>: <>no</>}</td>
                                <td>{item.docData.immunocompromised? <>yes</>: <>no</>}</td>
                                <td>{dateFormatter(item.docData.labCollectionDate).substring(0, 10)}</td>
                                <td>{dateFormatter(item.docData.symptomOnsetDate).substring(0, 10)}</td>

                            </tr>
                        ))}

                    </tbody>
                </DataTable>
                }
            </TableDiv>
        )

    }

    
    return (
        <div>
            <NavBar />
            {showModal?
            <EditForm close={closeModal} item={itemToModify} modalStatus={showModal} />
            : null}

            {displayDataFromDB()}

          

            
        </div>
    )
}

export default List
