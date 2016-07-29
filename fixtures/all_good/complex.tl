{@foo}{!comment!} buffer{/foo}
<div>{`bar`}</div>
{!some comment!}
<h1>hello hello</h1>
{#section}
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
  no sea takimata sanctus est Lorem ipsum dolor sit amet.
  {?exists}hello{/exists}
{/section}
{>partial/}
{@helperagain}with body text{@nested key="foo"/}{/helperagain}

{#something}
  {@baz key="x"/}
{/something}
