import React from 'react';

export default function Editor({input, text}) {
    return (
        <form>
            <trix-editor class="trix-content edit" input="input"></trix-editor>
            <input id="input" ref={input} type="hidden" name="content" value={text.__html}></input>
        </form>
    );
}