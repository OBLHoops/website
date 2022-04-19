import MyComponent from '../../../../slices/TextAsset';

export default {
  title: 'slices/TextAsset'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default theme","slice_type":"text_asset","items":[],"primary":{"theme":"light","text":[{"type":"paragraph","text":"Ipsum eiusmod laborum et reprehenderit commodo minim irure amet occaecat officia occaecat aliqua anim magna. Dolor do amet reprehenderit ea elit fugiat. Officia amet magna proident consequat aliquip tempor tempor dolor esse sunt dolor voluptate qui cupidatat fugiat.","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1531771686035-25f47595c87a?w=900&h=500&fit=crop"},"imagePosition":"left","imageOverlap":false},"id":"_Default"}} />
_Default.storyName = 'Default theme'

export const _WithIntroText = () => <MyComponent slice={{"variation":"withIntroText","name":"With intro text","slice_type":"text_asset","items":[],"primary":{"theme":"blue","label":[{"type":"heading2","text":"Seize vertical models","spans":[]}],"title":[{"type":"heading3","text":"Synthesize dynamic experiences","spans":[]}],"text":[{"type":"paragraph","text":"Consequat velit dolor proident incididunt fugiat fugiat. Ea Lorem in Lorem eu nisi in cillum deserunt non sit ea proident laborum velit. Laboris est consectetur deserunt veniam in tempor veniam non.","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=500&fit=crop"},"imagePosition":"right","imageOverlap":true},"id":"_WithIntroText"}} />
_WithIntroText.storyName = 'With intro text'
