@php($seo = \App\Support\SeoMeta::fromInertiaProps($page['props'] ?? []))
<title inertia>{{ $seo->title }}</title>
<meta name="description" content="{{ $seo->description }}">
<link rel="canonical" href="{{ $seo->canonical() }}">

<meta property="og:type" content="{{ $seo->type }}">
<meta property="og:site_name" content="{{ $seo->siteName() }}">
<meta property="og:url" content="{{ $seo->canonical() }}">
<meta property="og:title" content="{{ $seo->title }}">
<meta property="og:description" content="{{ $seo->description }}">
<meta property="og:image" content="{{ $seo->imageUrl() }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{ $seo->title }}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $seo->title }}">
<meta name="twitter:description" content="{{ $seo->description }}">
<meta name="twitter:image" content="{{ $seo->imageUrl() }}">

@foreach ($seo->schemas as $schema)
    <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
@endforeach
