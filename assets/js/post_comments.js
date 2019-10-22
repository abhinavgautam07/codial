

var addComment = function (postId) {
  let newCommentForm = $(`#post-${postId}-comment-form`);
  console.log(newCommentForm);
  newCommentForm.submit(function (event) {
    event.preventDefault();

    $.ajax({
      type: "post",
      url: "/comments/create",
      data: newCommentForm.serialize(),
      
      success: function (data) {
        let newComment=newCommentDom(data.data.comment);
        $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
         
      },error:function(err){
        console.log(err.responseText);
      }
    });


  });


}
let newCommentDom = function (comment) {
  return $(`<li id="comment-${comment._id}">
 
  <small>
    <a href="/comments/destroy/${comment._id}">&times;
    </a>
  </small>

  

  ${comment.content}
  <br>
  <small>
    ${comment.user.name}
  </small>

</li>`)

}

