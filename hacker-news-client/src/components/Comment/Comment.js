import { useEffect, useState } from 'react';
import './comment.css'
import moment from 'moment';
import parse from 'html-react-parser';

function Comment(props) {

  const [childComments, setChildComments] = useState(null);
  const [level, setLevel] = useState(0);
  const text = parse(`${props.text}`);

  const handleChildComments = async () => {
    const comments = await props.getChildComments(props.kids);
    setChildComments(comments);
    setLevel(level + 1);
  }

  //useEffect(() => {
//
  //}, [childComments])

  return (
    <section className='comments'>
      <div className='comment'>
        <div className='comment__info-zone'>
          <div className='comment__about-zone'>
            <p className='comment__about comment__about_author'>{props.by}</p>
            <p className='comment__about'>{moment.unix(props.time).format("DD.MM.YYYY HH:mm")}</p>
          </div>
          {props.kids &&
            <div className='comment__kids'>
              <p className='comment__about'>{props.kids.length}</p>
              <button className='comment__button' type='button' aria-label='Показать больше' onClick={async () => {await handleChildComments()}}/>
            </div>
          }
        </div>

        <div className='comment__text'>{text}</div>
      </div>
      <div className='comment__children' style={{marginLeft: `${level*35}px`}}>
      {
        childComments && childComments.map((comment) => {
          return <Comment 
            key = {comment.id}
            id = {comment.id}
            by = {comment.by}
            time = {comment.time}
            text = {comment.text}
            kids = {comment.kids}
            getChildComments = {props.getChildComments}
          />
        })
      }
      </div>
    </section>
  )
}

export default Comment;