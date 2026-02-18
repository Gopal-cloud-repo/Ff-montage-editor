import React from 'react';

const MontageSettings = () => {
    const [style, setStyle] = React.useState('default');
    const [sensitivity, setSensitivity] = React.useState(50);
    const [quality, setQuality] = React.useState(70);
    const [watermark, setWatermark] = React.useState(false);

    const handleStyleChange = (e) => setStyle(e.target.value);
    const handleSensitivityChange = (e) => setSensitivity(e.target.value);
    const handleQualityChange = (e) => setQuality(e.target.value);
    const handleWatermarkToggle = () => setWatermark(!watermark);

    return (
        <div>
            <h1>Montage Settings</h1>
            <label>
                Style:
                <select value={style} onChange={handleStyleChange}>
                    <option value="default">Default</option>
                    <option value="vintage">Vintage</option>
                    <option value="blackWhite">Black & White</option>
                </select>
            </label>
            <br />
            <label>
                Sensitivity:
                <input type="range" min="0" max="100" value={sensitivity} onChange={handleSensitivityChange} />
            </label>
            <br />
            <label>
                Quality:
                <input type="range" min="0" max="100" value={quality} onChange={handleQualityChange} />
            </label>
            <br />
            <label>
                <input type="checkbox" checked={watermark} onChange={handleWatermarkToggle} /> Watermark
            </label>
        </div>
    );
};

export default MontageSettings;