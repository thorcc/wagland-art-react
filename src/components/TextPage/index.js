import React, {useState, useEffect } from 'react';

const TextPage = props => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
    
        const getBio = async () => {
          const res = await props.firebase.get();
          const data = res.data().list;
          setInfo(data);
          console.log(data);
        }
    
        getBio();
      },[]);

    const items = info.map(item => {
        switch(item.type){
            case 'title':
                return <h1 key={item.id}>{item.text}</h1>

            case 'heading':
                return <h3 key={item.id}>{item.text}</h3>
                
            case 'paragraph':
                return <p key={item.id}>{item.text}</p>
            case 'list':
                return (
                    <div key={item.id}>
                        <h3>{item.text}</h3>
                        <ul>
                            {item.list.map(li => (
                                <li key={li.id}>{li.point} - {li.text}</li>
                            ))}
                        </ul>
                    </div>
                )
            
        }
    })

    return(
        <div>
            {items}
        </div>
    )
}

export default TextPage;