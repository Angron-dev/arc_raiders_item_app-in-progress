<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Rarity;
use App\Repository\RarityReadRepository;
use App\Repository\RarityWriteRepository;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RarityControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_return_single_rarity_by_id(): void
    {
        $rarity = Rarity::factory()->create();

        $readRepo = Mockery::mock(RarityReadRepository::class);
        $readRepo->shouldReceive('getRarityById')
            ->once()
            ->with($rarity->id)
            ->andReturn($rarity);

        $this->app->instance(RarityReadRepository::class, $readRepo);

        $response = $this->getJson(
            route('api.rarity.single', $rarity->id)
        );

        $response->assertStatus(200)
            ->assertJsonFragment([
                'rarity_name' => $rarity->rarity_name,
            ]);
    }

    #[Test]
    public function test_create_rarity_and_redirect(): void
    {
        $writeRepo = Mockery::mock(RarityWriteRepository::class);
        $writeRepo->shouldReceive('save')->once()->with(Mockery::type(Rarity::class));

        $this->app->instance(RarityWriteRepository::class, $writeRepo);

        $response = $this->post(route('api.rarity.create'), ['rarity_name' => 'Test Rarity', 'color' => '#00FF00']);

        $response->assertRedirect(route('rarity.list'));

    }

    #[Test]
    public function test_update_rarity(): void
    {
        $rarity = Rarity::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(RarityReadRepository::class);
        $readRepo->shouldReceive('getRarityById')
            ->once()
            ->with($rarity->id)
            ->andReturn($rarity);

        $this->app->instance(RarityReadRepository::class, $readRepo);

        $response = $this->put(
            route('api.rarity.edit', $rarity->id),
            ['rarity_name' => 'Updated rarity name', 'color' => '#f32432']
        );

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Item updated successfully',
            ]);
    }

    #[Test]
    public function test_delete_rarity_and_redirect(): void
    {
        $rarity = Rarity::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(RarityReadRepository::class);
        $readRepo->shouldReceive('getRarityById')
            ->once()
            ->with($rarity->id)
            ->andReturn($rarity);

        $writeRepo = Mockery::mock(RarityWriteRepository::class);
        $writeRepo->shouldReceive('delete')->once()->with($rarity);

        $this->app->instance(RarityReadRepository::class, $readRepo);
        $this->app->instance(RarityWriteRepository::class, $writeRepo);

        $response = $this->delete(route('api.rarity.delete', $rarity->id));

        $response->assertRedirect(route('rarity.list'));
    }
}
