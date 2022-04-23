import Moment from 'react-moment'
import 'moment-timezone'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
function renderDish(dish) {
    console.log("DishDetail Component rendered")
    if (dish != null)
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    else
        return(
            <div key="dishcarddetails"></div>
        );
}
function renderComments(comments,addComment, dishId) {
    if (comments != null)
        return(
            <div key="dishcommentsdetails">
                <h4>Comments</h4><br></br>
                <Stagger in>
                 {comments.map((comment)=>(<div keys={comment.id}><p>{comment.comment}</p><p>--{comment.author} , <Moment format="MMM DD,YYYY">{comment.date}</Moment></p></div>))}
                 {<CommentForm dishId={dishId} addComment={addComment}/>}
                 </Stagger>
            </div>
        );
    else
        return(
            <div  key="dishcommentsdetails"></div>
        );
}

function DishDetail(props)  {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                {renderDish(props.dish) }
            </div>
            <div className="col-12 col-md-5 m-1">
                {renderComments(props.comments,props.addComment,props.dish.id)}
            </div>
        </div>
        </div>
    );
    }
}
 
class CommentForm extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            modeltoggle:false
        }
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

        this.setState({modeltoggle:false})
        
    }
  
    modaltoggler=()=>{
        this.setState({modeltoggle:false})
    }
    handleclick=()=>{
        this.setState({modeltoggle:true})
    }
    render() { 
        return (
        <React.Fragment>
        <Button outline  onClick={this.handleclick}><span className="fa fa-pencil fa-lg">&nbsp;</span>Submit Comment</Button>
        <Modal isOpen={this.state.modeltoggle} toggle={this.modaltoggler}>
            <ModalHeader  toggle={this.modaltoggler}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    
                    <Label htmlFor="Rating" style={
                        {fontWeight:"500"}
                        }>Rating</Label>
                    <Control.select 
                    model=".rating" id="rating" name="rating" 
                    className="form-control">
                    <option >Select Option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </Control.select>
                    <br/>
                    <Label htmlFor="Author" style={
                        {fontWeight:"500"}}>Your Name</Label>
                    <Control.text 
                    model=".author" id="author" name="author"
                    placeholder="Your Name" className="form-control"
                    validators={{
                        minLength: minLength(3), maxLength: maxLength(15)
                    }}
                     
                    />
                       <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                        />
                    <br/>
                    <Label htmlFor="comment"  style={
                        {fontWeight:"500"}}><span></span>Comment</Label>
                    <Control.textarea
                    model=".comment" id="comment" name="comment"
                    placeholder="Comment" className="form-control"  rows="5"/>
                    <br/>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
                
                
            </ModalBody>
        </Modal>
        </React.Fragment>);
    }
}
 


   
export default DishDetail;