async function SubmitFormHandler() {

  const title = $('#title').val();
  const content = $('#description').val().trim();
  const category = $('#options').val();


  if(title == "")
    {
      title = titleEl.attr('placeholder');
    }
    if(content == "")
    {
      content = contentEl.attr('placeholder');
    }
    if(category == "")
    {
      category = categoryEl.attr('placeholder');
    }

    const id = $('#form').data('id');

    const response = await fetch(`/api/ticket/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        category,
        content,
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response, 'ticket submitted');
    window.location.href = '/homepage';
  }

$('#submit').on('click', SubmitFormHandler);