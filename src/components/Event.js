import React from "react"

const Event = ({ fakeId, event, events, setEvents}) => {

    const deleteHandler = () => {
        setEvents(events.filter(el => el.id !== event.id));
    }
    // <h1>{(fakeId+1) < 10 ? "0"+(fakeId+1) : (fakeId+1)}</h1>

    return (
        <div className="todo">
            <li id={event.id}>
                <div className="todo-item" >
                    <h4>Event:</h4>
                    {event.title}
                    <h4>Description:</h4>
                    <h5 class="desc">{event.text}</h5>
                    <h4>Image:</h4>
                    <h5>{event.media}</h5>
                    <h4>Image Credit:</h4>
                    <h5>History.com</h5>
                    <h4>Image Caption:</h4>
                    <h5>Battle of Gettysburg Painting</h5>
                </div>
            </li>
            <button onClick={deleteHandler} className="trash-btn"><i className="fas fa-trash"></i></button>
        </div>
    )
}

export default Event