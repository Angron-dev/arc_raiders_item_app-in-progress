<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\FoundIn;
use App\Repository\FoundInReadRepository;
use App\Repository\FoundInWriteRepository;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class FoundInControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_return_single_item_by_id(): void
    {
        $foundIn = FoundIn::factory()->create();

        $readRepo = Mockery::mock(FoundInReadRepository::class);
        $readRepo->shouldReceive('getItemCanBeFoundById')
            ->once()
            ->with($foundIn->id)
            ->andReturn($foundIn);

        $this->app->instance(FoundInReadRepository::class, $readRepo);

        $response = $this->getJson(
            route('api.found_in.single', $foundIn->id)
        );

        $response->assertStatus(200)
            ->assertJsonFragment([
                'found_in_name' => $foundIn->found_in_name,
            ]);
    }

    #[Test]
    public function test_create_found_in_and_redirect(): void
    {
        $writeRepo = Mockery::mock(FoundInWriteRepository::class);
        $writeRepo->shouldReceive('save')->once()->with(Mockery::type(FoundIn::class));

        $this->app->instance(FoundInWriteRepository::class, $writeRepo);

        $response = $this->post(route('api.found_in.create'), ['found_in_name' => 'Test Found In']);

        $response->assertRedirect(route('found_in.list'));

    }

    #[Test]
    public function test_update_found_in(): void
    {
        $foundIn = FoundIn::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(FoundInReadRepository::class);
        $readRepo->shouldReceive('getItemCanBeFoundById')
            ->once()
            ->with($foundIn->id)
            ->andReturn($foundIn);

        $this->app->instance(FoundInReadRepository::class, $readRepo);

        $response = $this->put(
            route('api.found_in.edit', $foundIn->id),
            ['found_in_name' => 'Updated found in name']
        );

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Item updated successfully',
            ]);
    }

    #[Test]
    public function test_delete_found_in_and_redirect(): void
    {
        $foundIn = FoundIn::factory()->make(['id' => 1]);

        $readRepo = Mockery::mock(FoundInReadRepository::class);
        $readRepo->shouldReceive('getItemCanBeFoundById')
            ->once()
            ->with($foundIn->id)
            ->andReturn($foundIn);

        $writeRepo = Mockery::mock(FoundInWriteRepository::class);
        $writeRepo->shouldReceive('delete')->once()->with($foundIn);

        $this->app->instance(FoundInReadRepository::class, $readRepo);
        $this->app->instance(FoundInWriteRepository::class, $writeRepo);

        $response = $this->delete(route('api.found_in.delete', $foundIn->id));

        $response->assertRedirect(route('found_in.list'));
    }
}
