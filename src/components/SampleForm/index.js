import React from "react";
class SampleForm extends React.Component {
  render() {
    return (
      <div className="devedit-form">
        <form>
          <fieldset>
            <legend>
              <span className="number">1</span> Candidate Info
            </legend>
            <input type="text" name="field1" placeholder="Your Name *" />
            <input type="email" name="field2" placeholder="Your Email *" />
            <textarea name="field3" placeholder="About yourself"></textarea>
            <label for="job">Interests:</label>
            <select id="job" name="field4">
              <optgroup label="Indoors">
                <option value="fishkeeping">Fishkeeping</option>
                <option value="reading">Reading</option>
                <option value="boxing">Boxing</option>
                <option value="debate">Debate</option>
                <option value="gaming">Gaming</option>
                <option value="snooker">Snooker</option>
                <option value="other_indoor">Other</option>
              </optgroup>
              <optgroup label="Outdoors">
                <option value="football">Football</option>
                <option value="swimming">Swimming</option>
                <option value="fishing">Fishing</option>
                <option value="climbing">Climbing</option>
                <option value="cycling">Cycling</option>
                <option value="other_outdoor">Other</option>
              </optgroup>
            </select>
          </fieldset>
          <fieldset>
            <legend>
              <span className="number">2</span> Additional Info
            </legend>
            <textarea name="field3" placeholder="About Your School"></textarea>
          </fieldset>
        { /* <button className="button-main" type="submit" value="Apply" >Apply</button>
          <button className="button-secondary" type="submit" value="Apply" >Apply</button>*/}
          <button className="button-tertiary" type="submit" value="Apply" >Apply</button>

        </form>
      </div>
    );
  }
}

export default SampleForm;
