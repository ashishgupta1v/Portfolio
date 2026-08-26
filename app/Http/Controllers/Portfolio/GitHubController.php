<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

final class GitHubController
{
    private const GITHUB_USERNAME = 'ashishgupta1v';
    private const CACHE_TTL = 3600; // 1 hour

    public function stats(): JsonResponse
    {
        $data = Cache::remember('github-stats', self::CACHE_TTL, function () {
            try {
                $userResponse = Http::withHeaders([
                    'Accept' => 'application/vnd.github.v3+json',
                ])->get('https://api.github.com/users/' . self::GITHUB_USERNAME);

                if (!$userResponse->ok()) {
                    return $this->fallbackStats();
                }

                $user = $userResponse->json();

                $reposResponse = Http::withHeaders([
                    'Accept' => 'application/vnd.github.v3+json',
                ])->get('https://api.github.com/users/' . self::GITHUB_USERNAME . '/repos', [
                    'per_page' => 100,
                    'sort' => 'updated',
                    'type' => 'owner',
                ]);

                $repos = $reposResponse->ok() ? $reposResponse->json() : [];

                $languages = [];
                $totalStars = 0;
                foreach ($repos as $repo) {
                    $totalStars += $repo['stargazers_count'] ?? 0;
                    if ($lang = $repo['language'] ?? null) {
                        $languages[$lang] = ($languages[$lang] ?? 0) + 1;
                    }
                }
                arsort($languages);

                return [
                    'publicRepos' => $user['public_repos'] ?? 0,
                    'followers' => $user['followers'] ?? 0,
                    'following' => $user['following'] ?? 0,
                    'totalStars' => $totalStars,
                    'topLanguages' => array_slice(array_keys($languages), 0, 5),
                    'recentRepos' => array_map(fn($r) => [
                        'name' => $r['name'],
                        'description' => $r['description'],
                        'language' => $r['language'],
                        'stars' => $r['stargazers_count'],
                        'url' => $r['html_url'],
                        'updatedAt' => $r['updated_at'],
                    ], array_slice($repos, 0, 6)),
                    'profileUrl' => $user['html_url'] ?? 'https://github.com/' . self::GITHUB_USERNAME,
                    'avatarUrl' => $user['avatar_url'] ?? null,
                ];
            } catch (\Exception $e) {
                return $this->fallbackStats();
            }
        });

        return response()->json($data);
    }

    private function fallbackStats(): array
    {
        return [
            'publicRepos' => 15,
            'followers' => 0,
            'following' => 0,
            'totalStars' => 0,
            'topLanguages' => ['PHP', 'Vue', 'TypeScript', 'JavaScript', 'Python'],
            'recentRepos' => [],
            'profileUrl' => 'https://github.com/' . self::GITHUB_USERNAME,
            'avatarUrl' => null,
        ];
    }
}
