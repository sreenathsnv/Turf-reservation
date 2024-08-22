import React from 'react'
import '../CSS/404.css'

const Page_404 = () => {
  return (
    <div className="error">
      <div className="wrap">
        <div className="error-code">
          <pre>
            <code>
              <span className="green">&lt;!</span>
              <span>DOCTYPE html</span>
              <span className="green">&gt;</span>
              <br />
              <span className="orange">&lt;html&gt;</span>
              <br />
              &nbsp;&nbsp;<span className="orange">&lt;style&gt;</span>
              <br />
              &nbsp;&nbsp;*&nbsp;{'{'}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="green">everything</span>:<span className="blue">awesome</span>;
              <br />
              &nbsp;&nbsp;{'}'}
              <br />
              &nbsp;&nbsp;<span className="orange">&lt;/style&gt;</span>
              <br />
              &nbsp;&nbsp;<span className="orange">&lt;body&gt;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;ERROR 404!
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;FILE NOT FOUND!
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">
                &lt;!--The file you are looking for, is not where you think it is.--&gt;
              </span>
              <br />
              &nbsp;&nbsp;<span className="orange">&lt;/body&gt;</span>
              <br />
              <span className="orange">&lt;/html&gt;</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Page_404